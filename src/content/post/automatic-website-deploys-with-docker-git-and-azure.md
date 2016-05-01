+++
date = "2016-04-09T17:35:39+02:00"
description = "A walkthrough of setting up automatic website deploys to a docker host on Azure running nginx and SSL with webhooks"
keywords = ["docker", "git", "azure", "docker container", "docker host", "ssl", "letsencrypt",
"automatic deploy", "nginx", "docker image", "webhook", "web hook"]
title = "automatic website deploys with git, docker, nginx and ssl hosted on Azure"
+++

This post will help you set up a workflow that will automatically deploy new
content to your website when your push to you git repository.

It assumes you are familiar with the concept of git, Linux, some basic bash
scripting and Docker. I've written a primer on [how Docker
works](/introduction-to-docker/) if you need a
quick introduction or recap.

## Quick steps
1. Set up a docker host
- Create a website container
- Create Docker automated build and connect to Github repo
- Set up webhook listener on host, add webhook to Docker build

## Workflow
After all the of the above is done, the workflow is:

1. Commit and push to github remote
- Github service integration will poke Docker hub that this repo has been updated
- Docker automatic build will activate our web hook 
- Docker host will pull the latest build and replace old website containers with the new one.

## Environment 
The enviroment consists of:

### Docker host 
The host run a web hook listener, the website container, an nginx proxy and a LetsEncrypt ACME container.

I'm running a Ubuntu 15.10 server in Azure. 
[Here's a virtual machine
template](https://azure.microsoft.com/en-us/marketplace/partners/canonicalandmsopentech/dockeronubuntuserver1404lts/) from Microsoft that deploys the server and
installs Docker Engine, which turns it into a docker host.

### nginx proxy
We will be using [this image](https://github.com/jwilder/nginx-proxy)
to make sure we can run multiple instances of our website in a load balanced
round-robin configuration.

This tool will automatically include all webservers with the same
`VIRTUAL_HOST`-environment variable in its request routing.

This is required when deployment happens because we will start a new container
that serves the updated website while the old one is still running.

As soon as the new container is up and running we will start taking down the old
container, which is usually done within a second or two.

### custom docker image
This is our custom container that will get updated and built every we commit
something to the git repository.

This is orchestrated by a `Dockerfile` that lives at the root of our git repo.

The `Dockerfile` contains a set of instructions that will be executed by the web
hook via `docker pull`.

The instructions include things like installing git and Go, building our site to
static content and starting an nginx server that serves the static content. 

### webhook listener
To make make sure our website is updated every time we push to the repository we
will need a service on the docker host that listens for requests to a specific
url.

[Docker hub](https://hub.docker.com) is going to help us automatically make a request to the web hook
whenever our git repository is updated.

When a request is made to this url this tool will execute a bash script that
does the following:

1. List all currently (old) running instances of our custom docker image and save
their IDs to a variable
2. Pull the latest version of the image via `docker pull`
3. Start a new container from the latest image via `docker run`
4. Shut down the old container that we listed in step 1 via `docker kill`

### LetsEncrypt ACME container
This container will automate certificate creation/renewal.

## Setting up automatic deploys

### Website container 
First of all you need a Github or Bitbucket repository for your website.

Create the repository and add a `Dockerfile` to it. This file will tell docker
what kind of scaffolding and configuration your web application container needs.
The last line of the file also tells it what command to run to keep the
container running.
Here's mine:
```
# use the nginx image from docker
FROM nginx

MAINTAINER Joakim Ahrlin "joakim.ahrlin@gmail.com"

# update stuffs, install some more stuff
RUN apt-get update && apt-get install -y \
    git \
    curl \
    mercurial

# install Go on the container, this is only required if you are using Hugo to
# generate your static content like I am

RUN mkdir /goroot && curl
https://storage.googleapis.com/golang/go1.6.linux-amd64.tar.gz | tar xvzf - -C
/goroot --strip-components=1

RUN mkdir /gopath

ENV GOROOT /goroot
ENV GOPATH /gopath
ENV PATH $PATH:$GOROOT/bin:$GOPATH/bin

# install Hugo, the static site generator
# if you want to use something else, like Webpack or jekyll, just install them instead
RUN go get -v github.com/spf13/hugo
RUN go install github.com/spf13/hugo

# copy source files (from the repo) to the container
ADD site-source /site-source

# run the 'hugo' command, generates the static content for the website
RUN cd /site-source && \
    hugo

# now copy the generated files to our web root
RUN cp -R /site-source/public /app/

# add our nginx configuration (from the git repo) to the container 
ADD nginx.conf /etc/nginx/nginx.conf

# make sure we expose port 80, required by our nginx proxy
# SSL is terminated on the proxy, not the container
EXPOSE 80

# run the nginx server
# as long as this command is running the container will stay up
CMD ["/usr/sbin/nginx"]
```

### Docker automated build
Now that our container is ready we need to set up an automated build in the [Docker hub](https://hub.docker.com/).

Go to your [Linked Accounts & Services](https://hub.docker.com/account/authorized-services/) and click "Link Github". Follow the steps to connect the Docker hub with your Github account.

Create a new automated build and select "Create Auto-build Github" and select the repository where you created the Dockerfile.

Every time you push to that repository Docker hub will build your image and trigger any webhooks you set up.

### Docker host

I've used [this image](https://azure.microsoft.com/en-us/marketplace/partners/canonicalandmsopentech/dockeronubuntuserver1404lts/) 
for running my server in Azure, there's probably plenty
more for other providers (AWS, DigitalOcean, Heroku, Google Cloud Platform, etc)

Deploy your host and then ssh to it:

```bash
ssh username@yourhost.com
```

### Install Go

```sh
$ sudo apt-get update
$ sudo apt-get -y upgrade
$ cd /opt/
$ sudo curl -O https://storage.googleapis.com/golang/go1.6.linux-amd64.tar.gz
$ sudo tar -xvf go1.6.linux-amd64.tar.gz
$ cd ~
$ mkdir ~/go
```
    
### Set Go paths

Edit your `~/.profile`

```bash
# ~/.profile
# add these at the END of the file

export GOROOT=/opt/go
export GOPATH=$HOME/go
export PATH=$PATH:$GOROOT/bin
```

### Install webhook
```bash
$ go get github.com/adnanh/webhook
```
#### Create deployment script
```bash
$ mkdir ~/scripts
$ vim ~/scripts/deploy.sh
```

```bash
#!/bin/bash

echo "List our currently running containers"
# this command will:
# run 'docker ps' to list all running containers
# use 'grep' to match the lines containing our buildname
# use 'awk' to print the first column, the id of the container, of our 
# grep-filtered output and assign it to our CONTAINER variable
CONTAINER=$(docker ps | grep <dockeruser/buildname> | awk '{print $1}')

echo "Get the latest version of the build"
docker pull <dockeruser/buildname>

echo "Start the new container"
docker run -d -e VIRTUAL_HOST=hostname -p 80 <dockeruser/buildname>

echo "Take down the old containers"
for i in ${CONTAINER[@]}
do
    echo "Killing $i"
    docker kill $i
done
```

Don't forget to make the script executable:

```bash
$ sudo chmod +x ~/scripts/deploy.sh
```

#### Create webhook configuration
```bash
$ touch hooks.json
$ vim hooks.json
``` 

```json
[
    {
        "id": "deployment-webhook",
        "execute-command": "/home/<username>/scripts/deploy.sh",
        "command-working-directory": "/home/<username>/webhook"
    }
]
```

#### Add webhook trigger to Docker build
Go to your automated build details in the Docker hub and select the Webhooks-tab.

Add a new one called "Deploy" and the set url to: `http://your-host-ip:9000/hooks/deployment-webhook`

### Set up proxy/load balancer, LetsEncrypt automatic create/renew SSL

We'll use [this awesome image](https://github.com/JrCs/docker-letsencrypt-nginx-proxy-companion) for the LetsEncrypt ACME.

```bash
# This is where our certificates will be stored
$ sudo mkdir /etc/nginx/certs -p
# The template config file for the virtualhosts
$ touch /etc/nginx/vhost.d
# This is where the image puts challenge files for LetsEncrypt to verify
$ sudo mkdir /usr/share/nginx/html -p
```

Now run the nginx proxy container with these mounted as volumes

```bash
$ docker run -d -p 80:80 -p 443:443 \
    --name nginx-proxy \
    -v /path/to/certs:/etc/nginx/certs:ro \
    -v /etc/nginx/vhost.d \
    -v /usr/share/nginx/html \
    -v /var/run/docker.sock:/tmp/docker.sock:ro \
    jwilder/nginx-proxy
```
Run the ACME container

```bash
$ docker run -d \
    -v /path/to/certs:/etc/nginx/certs:rw \
    --volumes-from nginx-proxy \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    jrcs/letsencrypt-nginx-proxy-companion
``` 

Now start your website container, make sure to add `-e`-variables for `LETSENCRYPT_HOST` and `LETSENCRYPT_EMAIL` to make sure certificate creation works.

```bash
$ docker run -d -e "VIRTUAL_HOST=jahrlin.com" -e "LETSENCRYPT_HOST=jahrlin.com" -e "LETSENCRYPT_EMAIL" -p 443 <dockerrepo/buildname>
```

Start the webhook listener

```bash
$ go/bin/webhook -hooks hooks.json -verbose
```

Test it by pushing a change to your Github repository, check the build status in Docker hub (usually takes a few minutes)
and watch your host console. If everything is correctly configured your website will be updated.

Inspired by https://blog.gopheracademy.com/advent-2014/easy-deployment/

+++
date = "2016-04-09T17:35:39+02:00"
description = "A walkthrough of setting up automatic website deploys to a docker host on Azure running nginx with githooks"
keywords = ["docker", "git", "azure", "docker container", "docker host",
"automatic deploy", "nginx", "docker image", "webhook", "web hook"]
title = "automatic website deploys with git, docker and nginx hosted on Azure"

+++
This post will help you set up a workflow that will automatically deploy new
content to your website when your push to you git repository.

It assumes you are familiar with the concept of git, Linux, some basic bash
scripting and Docker. I've written a primer on [how Docker
works](/introduction-to-docker/) if you need a
quick introduction or recap.
<!--more-->
## Quick steps
1. Create Github repository
- Create a Dockerfile in repository
- Create Docker account
    - Link Github account
- Create Docker automated build
    - Select Auto-build Github
    - Choose repository created in step 1
- Verify by pushing to repository and checking build status in Docker hub
- Set up a docker host (in Azure for example)
    - Install and run nginx proxy
    - `docker pull <buildname from step 4>`
    - `docker run -d -p 80 -e VIRTUAL_HOST=<websitehostname>`
    - Install Go and webhook, set up configurations
    - `go/bin/webhook -hooks hooks.json -verbose`
- In the Docker hub, add a webhook to your Docker build with URL of docker host + webhook path
- Verify everything by pushing a change in your website to github, time depends
  mostly on how busy the Docker hub is

## Workflow
After all the of the above is done, the workflow is:

1. git clone repository
- do some work
- commit and push to remote
- Github service integration will poke Docker hub that this repo has been updated
- Docker starts automatic builds that subscribe to the github repo
- Docker webhook makes a request to our Docker host web hook listener that
  starts our deployment script
    - pulls the latest build
        - this will run the Dockerfile in the repository that compiles the
          updated static content for the website
    - runs it as a docker container with VIRTUAL_HOST set
    - nginx-proxy adds the container to the pool of servers, now serves both old
      and new content á la round robin
    - kill old docker container
    - nginx-proxy now only serves the new content 

## Environment 
The enviroment consists of:
### Docker host 
> A docker host is basically a virtual machine with some docker tools
installed. 

I'm running a Ubuntu 15.10 server in Azure. 
[Here's a virtual machine
template](https://azure.microsoft.com/en-us/marketplace/partners/canonicalandmsopentech/dockeronubuntuserver1404lts/) from Microsoft that deploys the server and
installs Docker Engine, which turns it into a docker host.

The host  will in turn be running a few docker containers that are a kind of
nested virtual machine.

The docker host will run:

- an nginx proxy (a docker container)
- our custom docker image that contains the website files, all served by nginx
- webhook listener 

### nginx proxy
We will be using [this image](https://github.com/jwilder/nginx-proxy)
to make sure we can run multiple clones of our website in a load balanced
round-robin configuration.

This tool will automatically include all webservers with the same
`VIRTUAL_HOST`-environment variable in it's request routing.

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

## Setting up automatic deploys
### Github repository
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
EXPOSE 80

# run the nginx server
# as long as this command is running the container will stay up
CMD ["/usr/sbin/nginx"]
```

## Set up a docker host
I've used [this
image](https://azure.microsoft.com/en-us/marketplace/partners/canonicalandmsopentech/dockeronubuntuserver1404lts/) for running my server in Azure, there's probably plenty
more for other providers (AWS, DigitalOcean, Heroku, Google Cloud Platform, etc)

Deploy your host and then ssh to it:

```bash
ssh username@yourhost.com
```

### Install Go


```sh
$ sudo apt-get update
$ sudo apt-get -y upgrade
$ sudo curl -O https://storage.googleapis.com/golang/go1.6.linux-amd64.tar.gz
$ sudo tar -xvf go1.6.linux-amd64.tar.gz
$ mkdir ~/go
```
    
### Set Go paths

Edit your `~/.profile`

```bash
# ~/.profile
# add these at the END of the file

export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$PATH:$GOROOT/bin
```

### Install webhook
```bash
$ go get github.com/adnanh/webhook
```
#### Set up deployment script
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

Inspired by https://blog.gopheracademy.com/advent-2014/easy-deployment/

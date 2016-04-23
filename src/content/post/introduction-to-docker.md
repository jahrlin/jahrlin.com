+++
date = "2016-04-10T13:00:06+02:00"
description = "An introduction to Docker, explaining concepts like Docker host, Docker container, Docker image and dockerfile."
keywords = ["docker", "introduction", "docker host", "docker image", "docker container", "virtual machine", "dockerfile"]
title = "introduction to docker"
+++
I was inspired to write this post when working on my [automatic website
deploys](/automatic-website-deploys-with-git-docker-and-nginx-hosted-on-azure/) that utilizes docker.

This was my first time using docker and it was pretty confusing getting my head
around what docker is and what all the different parts are. I realize that my
idea of it is not 100% accurate but I figured I'll write it down in case anyone
was as confused as I was.
<!--more-->
Please note that there are a lot more docker tools than the ones mentioned here,
for everything from cloud provisioning to self-managed Docker image storage.

## Docker host
This is the main compontent of docker. It's a virtual machine much like any
other. If you use docker on OSX like me, it requires VirtualBox to run it.

A docker host *runs 1 or more docker containers*.

A docker host is what you allocate hardware resources to, like RAM and disk
space.

You can use other 'drivers' to run your docker host, like any cloud provider
(Azure, AWS, DigitalOcean, et al). Using one of these drivers will run your host
in the cloud and not locally.

Other drivers are VMware or Microsoft Hyper-V, with these you can run your host
locally.

## Docker container

A docker container is also like a virtual machine. The difference is that a container must be run within a docker
host.

A docker container is an *instance* of a docker image.

A docker container is used to run a specific application, like a web server or a
database.

The recommended approach is to have one container for every application you
need. In an example scenario, that means one container for your web server, one container for your
database and another container for your backend application. 

All docker containers within a host share resources.

Each container gets it's own network stack, so no privileged access to the
network interfaces of other containers. They are however on the same network, so
they can communicate with eachother.

## Docker image

A docker image is the base for a container.

You use the image to create and run the container.

An image can be created from a `Dockerfile` or pulled from a repository, like
the Docker hub.

You can also have a container that you've made changes to and build it into an
image.

An example scenario would be a new project you're setting up the hosting enviroment for.
You start by setting up a new container based of a clean Ubuntu install, this is
done by pulling the image for Ubuntu 14.04 from Docker hub.

Now that your Ubuntu Server is up and running, you start making some changes to
it. Like installing a web server (nginx, Apache, Flask, or express). Let's say
you also install a couple of monitoring tools, set up a few cron jobs and add a
database to it.

If this was a traditional project you would write a setup script or a document
to help other members of your team get started. The problem would arise when you
notice that someone is running OSX Leopard, someone else is running OSX Yosemite
and a third member is running Windows 10.

Docker images gets rid of that problem. All your team has to do is pull the
image and run it, and your environment are exactly identical!


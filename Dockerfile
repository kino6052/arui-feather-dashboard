FROM docker.moscow.alfaintra.net/mhart/alpine-node:6.9.4
MAINTAINER alfabank

ADD ssh /root/.ssh/
WORKDIR /src
ADD . /src

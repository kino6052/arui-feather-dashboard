FROM docker.moscow.alfaintra.net/mhart/alpine-node:6.9.4
MAINTAINER alfabank

WORKDIR /src
ADD build.tar /src

CMD [ "node", "./.build/server.js" ]

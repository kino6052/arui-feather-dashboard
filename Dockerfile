FROM docker.moscow.alfaintra.net/alpine-node:4.6
MAINTAINER alfabank

ADD tmp-package.json /tmp/package.json
ADD .npmrc /tmp
RUN cd /tmp && npm i --quiet --no-progress --unsafe-perm
RUN mkdir -p /src && mv /tmp/node_modules /src
# previous setting should take a chance modules will be cached
WORKDIR /src
ADD . /src
RUN npm run build
# clean some shit
RUN npm prune --production && rm -rf *.json.gzip && rm -rf /tmp/* && npm cache clear

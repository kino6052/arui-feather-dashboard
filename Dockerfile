FROM node:4.4.0
MAINTAINER alfabank

ADD ssh /root/.ssh/
ADD tmp-package.json /tmp/package.json
RUN cd /tmp && npm i --quiet --no-progress --unsafe-perm
RUN mkdir -p /src && mv /tmp/node_modules /src
# previous setting should take a chance modules will be cached
WORKDIR /src
ADD . /src
RUN npm run build
RUN npm prune --production

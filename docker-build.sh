#!/bin/bash

set -e

appName=$1
appVersion=$2

if [ "$MODULE_VERSION" != "" ]
then
  appVersion=$MODULE_VERSION
fi

echo "Docker image version: $appVersion"

image="docker.moscow.alfaintra.net/$appName:$appVersion"

tar -cf build.tar .build
tar -cf node_modules.tar node_modules
tar -cf config.tar config

docker build -f ./Dockerfile -t $image .
docker push $image
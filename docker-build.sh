#!/bin/bash

appName=$1
appVersion=$2

if [ "$MODULE_VERSION" != "" ]
then
  appVersion=$MODULE_VERSION
fi

echo "Start build for $image..."

echo "Docker image version: $appVersion"

image="docker.moscow.alfaintra.net/$appName:$appVersion"

tar -cf build.tar .build

echo "Import build to app container..."
docker build -f ./Dockerfile -t $image .

docker push $image

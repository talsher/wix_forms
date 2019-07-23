#!/bin/bash
echo "starting project on docker swarm"

# build node image
rsync -a --exclude='backend/node_modules' backend docker/nodejs
sudo docker image build --no-cache --tag wix_node_server:latest docker/nodejs/
rm -rf docker/nodejs/backend

# build nginx image
cd frontend
npm run-script build
cd ..
cp -rf frontend/build docker/nginx
sudo docker image build --no-cache --tag wix_nginx_server:latest docker/nginx/

# install mongodb
docker swarm init
docker stack deploy -c wix_form_compose.yml wix_forms
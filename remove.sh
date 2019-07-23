#!/bin/bash
echo "removing project"


docker stack rm wix_forms
echo "waiting for stack remove" 
sleep 20
docker image rm mongo:latest wix_node_server:latest wix_nginx_server:latest

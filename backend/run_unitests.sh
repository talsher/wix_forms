DOCKER_ID=$(docker ps -q -f "name=^wix_forms_node_server")
docker exec -it $DOCKER_ID npm test

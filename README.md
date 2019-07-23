steps to install:

1. install docker
2. run mongo container "docker run --name mongodb -p 27017:27017 -d mongo:latest"
3. connect to container and run mongo to login console
   use wix_forms
4. create collections: counters, forms
   db.createCollection("...")
5. add to counters collection counters for forms and formSubmissions
   db.counters.insert({\_id:"formId", count: 0})

TODO:

- add docker diploy
- edit readme

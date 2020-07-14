
#push to docker hub and activate travis
- Run the script create_multi_docker.sh and give as parameter  the name of the repo you opened.
- go to https://travis-ci.org/account/repositories and push 'sync account'
- In "Filter Repositories" choose the new repo and activate with the radio button
- go to https://travis-ci.org/github/shaya2468/<name of new repo>/settings
- add DOCKER_ID with my docker id
- add DOCKER_PASSWORD with docker password
- manuually trigger a build from travis ui or by a dummy commit
- go to https://travis-ci.org/github/shaya2468/<name of new repo> to see progress
- when done i should see my new docker images at https://hub.docker.com/repositories(updated a few seconds ago)

#Run locally

- ```docker-compose down && docker-compose up --build```
- go to http://localhost:3050/ 
- fill in some values and refresh(doesn't refresh autmatically)
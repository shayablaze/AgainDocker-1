### Theory

##### Seperation of containers:

* we have both node AND redis. We could have both of them, in the same applications. But that defis the point. 
* The point is that if we want to scale the app because of more requests, we can scale the container of the app with the node, and have only one redis instance. otherwise there would be multiple redis's and it wouldn't be consistent.

##### what is docker compose good for

* to connect between docker containers. otherwise you need to do complicated networking stuff that nobody does.
* Allows you to run multiple docker cli commands simultnaously
* Easily start up multiple containers at the same time, that connect to each other.

### Commands

To execute the docker compose file
```sh
$ docker-compose up
```

To execute the docker compose file
```sh
$ docker-compose up
```

To execute the docker compose file AND rebuild the images. it's equivelent of doing 'docker build .' again, and not just 'docker run {image name}'
```sh
$ docker-compose up --build
```

run everything in the background
```sh
$ docker-compose up -d
```

To stop all the containers, equivelent of (docker stop)
```sh
$ docker-compose down
```

To see only the containers in the project
```sh
$ docker-compose ps
```

### Notes
* To verify the projects works and run it.
    * go to root folder and do docker-compose up
    * in browser go to  http://localhost:4001/
* Subtle point: even though we added the trick for docker build to not do a lot of heavy stuff when changing code, you still have to do --build, for it to run the docker build . again. it's optimization for docker file, NOT docker compose

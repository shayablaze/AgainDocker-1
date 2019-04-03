creating a docker container 
```sh
$ docker create hello-world
> id-of-new-container-abc
```
running an existing docker container 
```sh
$ docker run id-of-new-container-abc
```

running an existing docker container with output
```sh
$ docker run id-of-new-container-abc -a
```
overriding a command, 2 examples
```sh
$ docker run busybox echo hi there
$ docker run busybox ls
```

listing containers 
```sh
$ docker ps
```

listing containers ever created, with their id's
```sh
$ docker ps -a
```

get logs of container
```sh
$ docker logs <container id>
```

get logs of container and keep listening
```sh
$ docker logs -f <container id>
```

stop a container gracefully
mind you, you only have 10 seconds
```sh
$ docker stop <container id>
```

kill a container immedietly
```sh
$ docker kill <container id>
```

executing commands in Running Container
-it allows us to provide input to the container
```sh
$ docker exec -it <container id> <command>
```
### Example:
terminal 1:
```sh
$ docker run redis
> id-of-redis-container
```
terminal 2:
```sh
$ docker exec -it id-of-redis-container redis-cli
127.0.0.1:6379> set myvalue 5
OK
127.0.0.1:6379> get myvalue
"5"
127.0.0.1:6379>
```






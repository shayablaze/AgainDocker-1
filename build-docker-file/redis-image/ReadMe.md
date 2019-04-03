## Build the image from Dockerfile

```sh
$ docker build .
```

The terminal will spit out the docker image id "Successfully built <docker id>"

## run the image

```sh
$ docker run <docker id from previous step>
```

## tag the image

```sh
$ docker tag <docker id from previous step> shaya/bla_docker_image:latest
```
* The convention is <your docker id>/<repo name>:<version>
* Now I can do something like

```sh
$ docker run shaya/bla_docker_image
```

We can also do this during the build with '-t'

```sh
$ docker build -t shaya/bla_docker_image .
```

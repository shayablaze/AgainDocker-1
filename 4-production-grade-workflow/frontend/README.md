# Steps to create project
The second command is to create the app, in the folder 'frontend'
```sh
$ npm install -g create-react-app
$ create-react-app frontend 
$ cd frontend
```

# The main commands

Strart development server, for development use only
```sh
$ npm run start 
```
Run the tests asscosiated with the project
```sh
$ npm run test
```
Build a production versions of the application
```sh
$ npm run build
```

# Docker configuration
#### We have Dockerfile and Dockerfile.dev for development and production use.

Run the dev configuration.
The -f means that there is a specific docker file to run, as opposed to just , where it means a file with the name 'Dockerfile'
```sh
$ docker build -f Dockerfile.dev .
```
# Notes

We delete the node_modules, since it will be installed in the image anyway, it's wastefull and we want to copy without waiting.

For the 3 npm configurations above, we create a seperate docker file.

After creating the image for development, with the Dockerfile.dev, there is a gotcha. If we were not running in docker, we would go to localhost:3000, because that is the port exposed. However now, we also have to expose a port into the container. for that we do port forwarding. We can now access the container with http://localhost:1234/
```sh
$ docker run -p 1234:3000  7924a2873f46
```

The file App.js, is where the welcome message for the app is. If i change the text, it won't be reflected in the ui, and then I have to build everything all over again which is wastefull. This leads us to ... VOLUMES

We put a reference from our machine to the container, as opposed to copying.

To run the volume command: 
```sh
docker run -p 1234:3000 -v /app/node_modules -v $(pwd):/app d74b47c73ed2
```

  - -v $(pwd):/app => map the current working directory to app.
  - -v /app/node_modules => freeze this folder, it's in order for it to not be deleted
 
Now if I make a change, it is reflected

We are going to do volumes in docker-compose because it's way easier and don't need to run the docker command each time.

```sh
version: '3'
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports: 
      - "3000:3000"
    volumes:
      - /app/node_modules
      - .:/app
```

With this docker-compose everything is up and running nicely.

If I want to run the tests, in the container of Dockerfile.dev, I run the image, but switch the first command.

```sh
docker run -it 3b2091f9a816 npm run test
```

But what if we want to run the tests, and have every change in UT re-run the tests?

We can do it old way, with setting up volumes with docker command.

I can run the docker-compose, seen a couple lines above, which is already set with volumes, and go into the container that is running, and run the test. That is an option.

But the better solution is to use docker-compose

So we add this part: 

```sh
tests:
    build:
      context: .
      dockerfile: Dockerfile.dev
    volumes:
      - /app/node_modules
      - .:/app
    command: ["npm", "run", "test"]
```
And now, there are 2 containers
  - 1 continaer running the server
  - 1 container running the tests

After running docker-compose up, I see the results of the UT in App.test.js, and when I make a change(add a test) the image is re-run

In development mode, there is a dev server, that processes the js code and returns it to browser. it does a lot of heavy stuff. but in production, all you need is one stagnant file to be delivered. for that we use a production server called nginx.
Nginx is all about taking incoming traffic and routing back some static files.

We are going to have a new Dockerfile for the production called Dockerfile.

See my comment in Dockerfile, to understand the idea of muli-step build.

Note that volumes isn't relevent anymore, since it's static files.

So, to run the production server I do 

```sh
$ docker build .
$ run -p 8080:80 <image name>
```

go to http://localhost:8080/, and i'm all good.
I used port 80 on the right, because that is the default port of nginx

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

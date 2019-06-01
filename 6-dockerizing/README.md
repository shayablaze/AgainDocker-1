```docker-compose up -- build```

- go to localhost:3050



#### To investigate start from docker-compose to see the different components and the comments are in code.

To dockerize the client part is a little different.
As opposed to the server, we only want to result of the html file that react spits.
So we make a nginx server just for the client.
see client/nginx
And in the docker file, client/Dockerfile we override the default
nginx file to use our defaul.conf.
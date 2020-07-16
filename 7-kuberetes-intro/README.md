## To get kubernetes running
##### It's not like docker-compose where everything is in one file.
1. verify your images are hosted on docker hub
2. make one config file to create the container
3. make one config file to setup networking

## What is an object?
Objects serve different purposes - running a container, monitoring a container, setting up networking.
##### Examples
- StatefulSet
- ReplicaController
- Pod
- Service

## What is an apiVersion?
The different objects we can contain that are scoped under it.

<img width="1366" alt="Screen Shot 2019-06-21 at 10 47 32" src="https://user-images.githubusercontent.com/8313826/59906694-02def880-9412-11e9-97d0-2cec054fb0c3.png">

## What is a node
For now, it is the virtual machine running on my computer. A node is used to run a number of objets.

## What is a pod?
allow the grouping with of containers with a common purpose. 
example:

<img width="1392" alt="Screen Shot 2019-06-21 at 10 58 07" src="https://user-images.githubusercontent.com/8313826/59907332-864d1980-9413-11e9-823e-90637098b485.png">

They all have a very tight intergation with postgress, as opposed to a server and a client sitting together in the pod.
If the postres breaks down, the rest of the pods are pointless

## What is a service?
Sets up networking in a kubernetes cluster
There are four types
- ClusterIP
- NodePort - expose a container to the outside world, only for dev
- LoadBalancer
- Ingress

## What is a Kube proxy?
It is the connection of the cluster to the outside world. It will decide which nodeService to route to.

<img width="1263" alt="Screen Shot 2019-06-21 at 11 16 38" src="https://user-images.githubusercontent.com/8313826/59908461-24da7a00-9416-11e9-904b-9ead842fbc21.png">

## What is a label selector?

The service will direct traffic to the client, by expressing that it's selector in component:web
The pod(who is operating as a client) will expose itself by labeling itself as web.
That is how the service and pod bind.
note: the key value pair are anything we want, it could be bla:blabla, it just has to be compatible on both.

<img width="1326" alt="Screen Shot 2019-06-21 at 11 22 35" src="https://user-images.githubusercontent.com/8313826/59908797-e7c2b780-9416-11e9-8a91-6358e5ce4f98.png">

## ports in a service
To see what the ports are in the service, i put notes on the service object client-node-port.yaml

## Applying the inofrmation written in the config files

<img width="1301" alt="Screen Shot 2019-06-21 at 11 28 04" src="https://user-images.githubusercontent.com/8313826/59909200-c6ae9680-9417-11e9-870b-611a016ba6ac.png">

We will run it for every config file we built, service and pod.

##### pods :
```kubectl apply -f client-pod.yaml```
##### serivces :
```kubectl apply -f client-node-port.yaml```
note that in the ports column, we see the ports we mapped in the config file

## Why isn't localhost:31515 not working?
Because the virtual machine has it's own ip and that is what we use. It has it's own ip address.
To get it we'll type
```minikube ip```

To get the status of objects. using get:
```k get <object type: services/pods>```
example:
```k get pods```
```k get services```

## The series of actions/ flow - lec 190 "The entire deployment flow"

<img width="1363" alt="Screen Shot 2019-06-21 at 13 45 19" src="https://user-images.githubusercontent.com/8313826/59917675-38dca680-942b-11e9-9dd6-3bcbd5669159.png">


## What is a  Master?
When I apply the deployment file, it is moved over to something called a Master.
It controlles everything in the kube cluster. It has a few programs.
One of them is 

## kube-apiserver

Supervises all the nodes in the cluster and verifying they are doing the right thing.
it will get from the deployment file how many copies of every container to run.
<img width="756" alt="Screen Shot 2019-06-21 at 13 53 31" src="https://user-images.githubusercontent.com/8313826/59917949-f8c9f380-942b-11e9-8357-bf578e783165.png">
 In this example, the deployment file says it needs to run 4 'multi-worker'.
 It has 3 nodes to it's disposal. 
 It will tell one node to run 2 copies, and the others, 1: altogether 4, as required.
 It will tell the node, which image to download from the hub.
 All nodes will download the image:
 <img width="1419" alt="Screen Shot 2019-06-21 at 13 57 23" src="https://user-images.githubusercontent.com/8313826/59918173-9a514500-942c-11e9-99d3-745bc4a33cf1.png">
 
 Each node will then create the docker containers. In our example, one node will create two containers, and the others, one container.
 <img width="692" alt="Screen Shot 2019-06-21 at 13 59 19" src="https://user-images.githubusercontent.com/8313826/59918255-d389b500-942c-11e9-9b96-07b5e0754f31.png">

note: The containers are running inside pods.
 
## Now we understand why when I kill a pod, it springs up again.
Because the master sees that one is missing, and sends a message to the node to spring up another one.
 
 ## Regarding how we as developers connect with nodes/pods
 Only throught the Master. We can get logs from the pods and stuff like that but we never give commands to a pod, only through the master.
 The master is ALWAYS monitoring the nodes to see that the list of responsibilites is always maintained.
 
 ## Summary
 
 <img width="1163" alt="Screen Shot 2019-06-21 at 14 20 17" src="https://user-images.githubusercontent.com/8313826/59919306-be625580-942f-11e9-946c-5a5e5f9e9292.png">
 
 
## Updating the container in a deployment

I do it the declerative way, we put shayaajz/multi-worker in client.pod.yaml, instead of shayaajz/multi-client and ran ```apply``` 

To see that the changes took effect we use 

![Screen Shot 2019-06-30 at 22 19 34](https://user-images.githubusercontent.com/8313826/60401158-13b40a80-9b86-11e9-8506-a476c63fc072.png)

for example: 
```k describe pod client-pod```

where client-pod, is the name of the pod from client.pod.yaml, and I can also see it by running ```k get pods```

The image is updated because the uniqueness is defined by kind*name, from the client.pod.yaml in this example.

## Problem: I can not update any field I want in the client.pod.yaml file otherwise I get an error.

This is not intuitive with what we said till now, that it should be very easy. Here is what you can update:

![Screen Shot 2019-06-30 at 22 33 04](https://user-images.githubusercontent.com/8313826/60401260-398ddf00-9b87-11e9-8ed8-d09ecafdaece.png)

The solution:

## Deployments

![Screen Shot 2019-06-30 at 22 36 47](https://user-images.githubusercontent.com/8313826/60401387-54f9e980-9b89-11e9-9955-136190795e45.png)

![Screen Shot 2019-06-30 at 22 38 49](https://user-images.githubusercontent.com/8313826/60401388-5c20f780-9b89-11e9-9e16-156fed64888c.png)

See new file client-deployment.yaml with comments

## Deleting an object

In our example we want to get rid of the pod we created before we mess with deployments.
![Screen Shot 2019-06-30 at 22 52 03](https://user-images.githubusercontent.com/8313826/60401416-c89bf680-9b89-11e9-9fc4-15e83270accb.png)

In our example:
```k delete -f client.pod.yaml```

Behind the scends it will look for the tuple Name*type that is specified in the file.

We now can apply the deployment
```k apply -f client-deployment.yaml```

And when executing ```k get pods``` I'll get a pod created fromt the deployment.

We can also see the state of the deployments:
```k get deployments```

I can now access http://192.168.99.100:31515/
It is being run by the deployment 


## Whats the point of services?

when running

```k get pods -o wide```

we can see that there is an ip assigned.
Every pod gets an ip, but there is no way we can know it.
1. We can destroy the pod
2. there can be a couple with different addresses.

So it doesn't make sense to directly connect to an ip address of a pod.

The beuty of the service it that it uses it's selector to connect to the pods, regardless of their ips. in our case it's component:web


### how do we update the deployment with new image if it's "latest"?

- we'll tag it.. docker tag .... :v4
- k set image deployment/client-deployment client=stephengrider/multi-client:v5

## when starting from scratch

go to docker dolpin and restart the cluster

we installed stuff in 158

k cluster-info


Object- a thing in a kuberetes cluster: pod/service/replicaController/StatefulSet

apiVersion - limits the types of objects we can confiugre in our configuration file

youll always first decide what types of objects you need, and then decide which api version fits them


pod is a grouping of containers with a common purpose, it's the smallest thing we can deploy to run a single container.

Service - to setup networking

applying a config file to kubectl: 
k apply -f <filename>

we will apply:
k apply -f <both our files>

k get <object> is the type of object we want, in our example pods, so we do k get pods 

there is no more localhost, just what we got in 'minikube ip' which is 192.168.99.100

http://192.168.99.100:31515/

Node - a computer or vm that is going to run some objects in a kluster

The deployment file goes to the master, and it takes care of running and communicating with the nodes

kubectl speaks with the master, you never directly talk to a node
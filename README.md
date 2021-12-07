# sales-app

## About 

Simple Sales managing fullstack application developed with 
* Django (Rest framework API) */salesbackend*
* React (MUI) */salesfronted*
* Postgresql (*official docker container image*)

## Install

The instructions assume that you have already installed [Docker](https://docs.docker.com/installation/) and [Docker Compose](https://docs.docker.com/compose/install/). 
git clone the this repository

    
    git clone https://github.com/aboddenp/sales-app.git .
    
## How to get up and running
Once you've cloned the project to your host we can now start the project. Easy! Navigate to the directory in which you cloned the project. Run the following commands from this directory 

Rename the *.env-sample* in sales-app/salesbackend and *.env-sample* in sales-app/salesfrontend to just *.env* and then compose the project with the following command
    

    docker-compose up -d
    
Apply the django migrations with the following command 

     docker-compose run backend python3 manage.py migrate 
     
The  docker-compose command will pull the images from Docker Hub and then link them together based on the information inside the docker-compose.yml file. This will create ports, links between containers, and configure applications as requrired. After the command completes we can now view the status of our stack

    docker-compose ps
    
Interact with the backend in the browser [localhost:8000](http://localhost:8000/) and the frontend in [localhost:3000](http://localhost:3000/)

## How to POST

### create a new user 
```JSON
{
    "first_name":"John",
    "last_name":"Doe",
    "username":"JohnDoe123",
    "profile": {
        "phone":"2405659334"
    }
}
```

### create a new product
```JSON
{
    "name":"battery-pack",
    "description":"used to charge items",
    "price":"4.99"
}
```

### create a new sale
user corresponds to the **id** of the user assigned to this sale    
product corresponds to the **id** of the product assigned to this sale
```JSON
{
    "quantity":1,
    "user": 1, 
    "product":1
}
```

## POSTMAN Example 

   [postman json link](https://www.getpostman.com/collections/2d61af62d57744e25257)
   
# Screenshots 
![image](https://user-images.githubusercontent.com/43423531/144917341-5d58a358-aad5-48e9-aedb-0a16c064e04d.png)

![image](https://user-images.githubusercontent.com/43423531/144917482-45e17981-af75-41e1-804d-86123927b7e7.png)

![image](https://user-images.githubusercontent.com/43423531/144917548-d7d721c3-a29d-441d-88bf-c9ff597f9fcf.png)

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
    

    docker-compose up -d

The  docker-compose command will pull the images from Docker Hub and then link them together based on the information inside the docker-compose.yml file. This will create ports, links between containers, and configure applications as requrired. After the command completes we can now view the status of our stack

    docker-compose ps
    

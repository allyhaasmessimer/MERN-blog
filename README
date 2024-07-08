# Deploying a React App on AWS Elastic Beanstalk

## Overview

This project involves deploying a full-stack React application using the MERN (MongoDB, Express, React, Node.js) stack on AWS Elastic Beanstalk. Elastic Beanstalk automates the setup, including server provisioning, load balancing, and scaling.

## Table of Contents

1. [Overview](#overview)
2. [Project Goals](#project-goals)
3. [Prerequisites](#prerequisites)
4. [Architecture Design](#architecture-design)
5. [Dockerization](#dockerization)
6. [Deployment on Elastic Beanstalk](#deployment-on-elastic-beanstalk)
7. [Running Locally](#running-locally)
8. [Summary](#summary)
9. [Usage](#usage)

## Project Goals

-   Efficiently deploy a React application on AWS Elastic Beanstalk.
-   Implement autoscaling, load balancing, and continuous monitoring.
-   Gain hands-on experience with AWS services and infrastructure automation.

## Prerequisites

-   Basic understanding of Docker and AWS Elastic Beanstalk.
-   Docker installed on your local machine.
-   AWS CLI configured on your local machine.
-   A React application ready for deployment.

## Architecture Design

### Components

-   Frontend: React application
-   Backend: Node.js and Express application
-   Database: MongoDB (hosted on MongoDB Atlas)

### Data Flow

-   The frontend interacts with the backend API to fetch and display data.
-   The backend connects to the MongoDB database to perform CRUD operations.

## Dockerization

### Frontend

1. Build the Docker image:
    ```sh
    docker image build -t frontend-blog:latest .
    ```
2. Run the container locally:
    ```sh
    docker run -d -p 3000:3000 frontend-blog:latest
    ```

### Backend

1. Build the Docker image:
    ```sh
    docker image build -t backend-blog:latest .
    ```
2. Run the container locally:
    ```sh
    docker run -d -p 4000:4000 backend-blog:latest
    ```

### Push Images to DockerHub

#### Frontend

```sh
docker push allyhaas/frontend-blog:latest
```

## Deployment on Elastic Beanstalk

1. Create a Dockerrun.aws.json file for both the frontend and backend.
2. Zip the Dockerrun.aws.json file.
3. Navigate to the AWS Elastic Beanstalk console and create a new application.
4. Upload the zipped Dockerrun.aws.json file to deploy your application.

## Running Locally

To run your application locally without Docker, use the following commands:

### Frontend

Navigate to your frontend directory and start the application:

```sh
npm start
```

### Backend

Navigate to your backendend directory and start the application:

```sh
nodemon index.js

```

## Summary

This guide details the process of deploying a full-stack React blog app using the MERN (MongoDB, Express, React, Node.js) stack to AWS Elastic Beanstalk, ensuring a scalable cloud infrastructure for the application. It covers cloud deployment, Dockerization, and managing AWS services.

## Usage

1. Clone the repository:

```sh
Copy code
git clone https://github.com/allyhaasmessimer/MERN-blog.git
cd MERN-blog
```

2. Initialize and build the Docker images:

```sh
Copy code
docker image build -t frontend-blog:latest .
docker image build -t backend-blog:latest .
```

3. Push the images to DockerHub:

```sh
Copy code
docker push allyhaasmessimer/frontend-blog:latest
docker push allyhaasmessimer/backend-blog:latest
```

4. Deploy the application on Elastic Beanstalk:

-   Create and upload the Dockerrun.aws.json file.

5. Verify the deployment:

-   Check the AWS Elastic Beanstalk console to ensure all resources are created as expected.

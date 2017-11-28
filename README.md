# Trainline departures API

## An API that returns the train services in order for the customers to view live departure information

![alt text](docs/trainline.jpg "Train")

### Technologies used

Node.js, ES7, TypeScript, Express, pm2, Redis, Nginx, Docker, apiDoc, mocha, sinon, istanbul.

### Dependencies

- Docker
- docker-compose
- yarn

### Before anything

Install the packages and build by entering the api directory and running:

```bash
yarn && yarn build
```

### Testing the API and checking the code coverage

In order to run the tests, enter the api directory and run:

```bash
yarn test
```

After that, you can open api/coverage/lcov-report/index.html on your browser to check the code coverage result.

### Generating the documentation for the endpoints

In order to generate the HTML with the documentation, enter the api directory and run:

```bash
yarn docs
```

After that, it will be available inside docs/apidoc

### Developing

For developing new functionalities, you can use nodemon, pm2 or the pm2 docker image for development. If you choose the docker image, then enter the infra directory and run:

```bash
docker-compose -f docker-dev.yml up
```

This will start the Nginx, Redis and pm2 containers. This pm2 container is configured for reloading the code every time it is modified.

### Deploying

In order to run it in production, instead of running the docker-dev.yml file, you can run the docker-compose.yml file:

```bash
docker-compose up
```

## How the configuration can be managed

For a development version to be built on a CI/CD server, a specific job just for building can be created. It can use the docker-dev.yml configuration file for the infrastructure when running the tests.

## How is the Node process managed when the service is deployed

A delivery job can be configured on the CI/CD server, and this job can send the package with the code to the remote server after all tests ran successfully. After the remote server receives the updated code, the delivery job can run on it the command to reload the Node processes, and that happens with no downtime, as they are clustered by pm2 and pm2 allows reload with zero downtime. The command the job will have to run on the remote server is:

```bash
docker exec -it trainline_api pm2 reload all
```

## Further improvements

- Get list of train operators, as a link wasn't given for that, and match it with the operator codes to return the real names
- Configure log management on AWS CloudWatch

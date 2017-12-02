# Trainline departures API

## An API that returns the train services in order for the customers to view live departure information

[![Build Status](https://travis-ci.org/jonathas/trainline-departures.svg?branch=master)](https://travis-ci.org/jonathas/trainline-departures) [![Coverage Status](https://coveralls.io/repos/github/jonathas/trainline-departures/badge.svg?branch=master)](https://coveralls.io/github/jonathas/trainline-departures?branch=master)

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

## Further improvements

- Get list of train operators, as a link wasn't given for that, and match it with the operator codes to return the real names
- Configure log management on AWS CloudWatch

# Services-Bus-test 
This is a complete test project for Service-Bus.

You can see the code and learn the different uses and its components.


## Test options 
For setting the TEST's environment variable with the following options:

 ### TEST=CQRS
 Is the default test, It will test the entire CQRS Simulation with aggregates, events, and Bus.
### TEST=NOCQRS
 It will test the  CQRS Simulation with events and Bus only.
### TEST=BUS
 It will test a BUS only, how to use the queue worker.
### TEST=REPORT
 It will test the  CQRS' s Query command. To run TEST=CQRS previously is required. 


## Requirements

- [Node.js](https://nodejs.org/) v6+
- Redis (if Redis is not installed locally you can use this [docker file](https://github.com/LabShare/services-bus/blob/master/run/Dockerfile))

## Installation
```sh
npm i 
```
*You might need to use sudo (UNIX).

##Usage
### Preparation
- Create a config.json using sample-config.
- Set the redis values for bus and for the eventStore.
    - maxTime is how much time (in seconds) the test data should be kept at Redis (only for eventStore).
    - isConcurrent evaluate if the eventStore needs to validate concurrency if you are doing the test between multiple machines you need to set it to False otherwise true.
- Set the name inside the calculator property with your identifier (any name). This is for test the project across multiple processes or machines.
- Set the required type for each of the command and event's handlers:
  
```sh

 "commandHandlers": [{
            "name": "CalculatorCommand",
            "path": "**/commandHandlers/calculator.*",
            "type" : 0
        },
```
 - duplex = 0 //Default : It will create receive and publish commands|events in the same process machine. 
 - publisher= 1: It will only publish commands|events in the current process or machine.
 - consumer = 2: It will only publish commands|event in the current process or machine.
You can play with the different options for example:

Only publish the commands in the current machine|process and receive the events from another machine|process.
```sh
      "commandHandlers": [{
            "name": "CalculatorCommand",
            "path": "**/commandHandlers/calculator.*",
            "type" : 1
        }],
        "eventHandlers": [{
            "name": "CalculatorEvent",
            "path": "**/eventHandlers/calculator.*",
            "type" : 2
        }],
```
Only receive the commands in the current machine|process and publish the events to another machine|process.
```sh
      "commandHandlers": [{
            "name": "CalculatorCommand",
            "path": "**/commandHandlers/calculator.*",
            "type" : 2
        }],
        "eventHandlers": [{
            "name": "CalculatorEvent",
            "path": "**/eventHandlers/calculator.*",
            "type" : 1
        }],
```
### Execution in Unix

 ### TEST=CQRS
 ```sh
  TEST=CQRS node  dist/index.js
 ```
### TEST=NOCQRS
  ```sh
  TEST=NOCQRS node  dist/index.js
 ```
### TEST=BUS
  ```sh
  TEST=BUS node  dist/index.js
 ```
### TEST=REPORT
 ```sh
  TEST=REPORT node  dist/index.js
 ```

**NOTE** For running the test from windows you need to set the env variables like:
```sh
SET TEST=CQRS
```

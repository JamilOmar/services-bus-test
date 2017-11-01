'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
//Reference to @labshare/services-bus
const services_bus_1 = require("@labshare/services-bus");
let config = require('../../config.json');
//Inherit from Aggregate
class Calculator extends services_bus_1.Models.Entities.Aggregate {
    constructor(id) {
        super(id);
    }
    sum(a, b) {
        let self = this;
        return new Promise((resolve, reject) => {
            //Simulate Interval;
            setInterval(() => {
                // Calling event onSum and adding the machine name
                self.apply('onSum', { a, b, c: a + b, machineName: config.calculator.name });
                resolve();
            }, 10000);
        });
    }
}
exports.Calculator = Calculator;

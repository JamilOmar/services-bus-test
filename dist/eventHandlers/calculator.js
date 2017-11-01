"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CQRS = require("@labshare/services-bus");
const ServicesCache = require('@labshare/services-cache').Cache;
const config = require('../../config.json');
class Calculator extends CQRS.Events.EventHandler {
    constructor() {
        super();
        this.reportDatabase = new ServicesCache(config.sb.eventStore.redis, config.sb.eventStore.maxTime);
    }
    // method for simulate the CQRS process
    onSum(data) {
        return this.reportDatabase.saveObjectInList('calculator-storage', data.eventVersion, data.eventVersion, data).then(d => {
            console.log('Received:', JSON.stringify(data));
            return;
        });
    }
    // method for simulate the CQRS without Aggregates and Event's store
    onSumNoAggregate(data) {
        return new Promise((resolve, reject) => {
            console.log('Received:', JSON.stringify(data));
            resolve();
        });
    }
}
exports.default = Calculator;

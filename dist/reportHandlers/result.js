"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CQRS = require("@labshare/services-bus");
const ServicesCache = require('@labshare/services-cache').Cache;
const config = require('../../config.json');
class Result extends CQRS.Reporting.ReportHandler {
    constructor() {
        super();
        this.reportDatabase = new ServicesCache(config.sb.eventStore.redis, config.sb.eventStore.maxTime);
    }
    // method for only test the bus
    result(data) {
        return this.reportDatabase.getAllObjectsList('calculator-storage').
            then(d => {
            console.log('data sent: ', data);
            return d;
        });
    }
}
exports.default = Result;

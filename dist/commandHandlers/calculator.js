"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require("q");
const CQRS = require("@labshare/services-bus");
const CalculatorAggregate = require("../aggregates/calculator");
class Calculator extends CQRS.Commands.CommandHandler {
    constructor() {
        super();
        this.store = CQRS.ServiceLocator.Process.Instance.eventStore;
    }
    // method for simulate the CQRS process
    sum(data) {
        let self = this;
        let spMethod = Q.async(function* () {
            let aggregate = new CalculatorAggregate.Calculator();
            //creating a key
            let key = CQRS.Utils.Key.createKey(['Calculator', '1']);
            //setting the id to the aggregate
            aggregate.id = key;
            //retreiving the version from the store
            aggregate.version = yield self.store.load(key);
            //adding the domain event
            aggregate.onEvent("onSum", function (data) {
                console.log('onSum', data);
            });
            //performing the aggregate's method
            yield aggregate.sum(data.a, data.b);
            //saving the event at the event's storage
            yield self.store.saveEvents(aggregate, function (domainEvent) {
                //send the result to the Event handler
                CQRS.ServiceLocator.Process.Instance.publishEvent(new CQRS.Models.Entities.Command('CalculatorEvent', domainEvent.eventName, domainEvent));
            });
            //don't forget to unsuscribe to the events
            aggregate.removeEvents('onSum');
        });
        return spMethod();
    }
    // method for simulate the CQRS process with out Aggregate and without Event's store
    sumNoAggregate(data) {
        return new Promise((resolve, reject) => {
            data.c = data.a + data.b;
            CQRS.ServiceLocator.Process.Instance.publishEvent(new CQRS.Models.Entities.Command('CalculatorEvent', 'onSumNoAggregate', data));
            resolve();
        });
        //send the result to the Event handler
    }
    // method for only test the bus
    message(data) {
        return new Promise((resolve, reject) => {
            CQRS.ServiceLocator.Process.Instance.publishCommand(new CQRS.Models.Entities.Command('ResultCommand', 'result', data));
            resolve();
        });
    }
}
exports.default = Calculator;

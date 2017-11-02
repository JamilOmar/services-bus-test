import * as Q from 'q';
import * as _ from 'lodash';
import * as CQRS from '@labshare/services-bus'
const ServicesCache = require('@labshare/services-cache').Cache;
const config = require('../../config.json')
export default class Calculator extends CQRS.Events.EventHandler<any> {
    constructor() {
        super();
        this.reportDatabase = new ServicesCache(config.sb.eventStore.redis, config.sb.eventStore.maxTime);
    }
    // method for simulate the CQRS process
    onSum(data: CQRS.Models.Entities.DomainEvent): Promise<any> {
        /// Storing the data in the reportdatabase
        return this.reportDatabase.saveObjectInList('calculator-storage', data.eventVersion, data.eventVersion, data).then(d => {
                console.log('Received:', JSON.stringify(data));
                return;
            });

    }
    // method for simulate the CQRS without Aggregates and Event's store
    onSumNoAggregate(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log('Received:', JSON.stringify(data));
            resolve();
        });
    }

}
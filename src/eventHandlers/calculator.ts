import * as Q from 'q';
import * as _ from 'lodash';
import * as CQRS from '@labshare/services-bus'
export default class Calculator extends CQRS.Events.EventHandler<any> {
    constructor() {
        super();
    }
    // method for simulate the CQRS process
    onSum(data: CQRS.Models.Entities.DomainEvent): Promise<any> {
        return new Promise((resolve, reject) => {            
           console.log('Received:',JSON.stringify(data));
           resolve();
        });
    }
      // method for simulate the CQRS without Aggregates and Event's store
      onSumNoAggregate(data: any): Promise<any> {
        return new Promise((resolve, reject) => {            
           console.log('Received:',JSON.stringify(data));
           resolve();
        });
    }

}
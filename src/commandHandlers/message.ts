import * as Q from 'q';
import * as _ from 'lodash';
import * as CQRS from '@labshare/services-bus'
import * as CalculatorAggregate from '../aggregates/calculator'

export default class Message {
    constructor() {
    }
     // method for only test the bus
    message(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log(data);
            resolve();
        });

    }

}
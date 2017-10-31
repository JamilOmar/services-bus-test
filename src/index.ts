import * as Q from 'q';
import * as _ from 'lodash';
import * as CQRS from '@labshare/services-bus';
let random = require('random-number');
let config = require('../config.json')
let options = {
    min: 1
    , max: 10000
    , integer: true
}
console.log('STARTING THE SERVICES BUS TEST:',config.calculator.name );
let processQ = Q.async(function* () {

    //setting the configuration 
    CQRS.ServiceLocator.Process.Instance.setConfig(config.sb);
    //load the singleton object
    yield CQRS.ServiceLocator.Process.Instance.load();
    //setting the Process events.
    CQRS.ServiceLocator.Process.Instance.onEvent("channelError", (x: any) => {
        console.log('channelError', x);

    })
    CQRS.ServiceLocator.Process.Instance.onEvent("channelError", (x: any) => {
        console.log('channelError', x);

    })
    CQRS.ServiceLocator.Process.Instance.onEvent("messageProcessed", (x: any) => {
        console.log('Message Processed')
    })
    let i = 0;
    switch(process.env.TEST){
        //It will test the CQRS without Aggregates and Event's store
        case 'NOCQRS':
        while (i < 100) {
            CQRS.ServiceLocator.Process.Instance.publishCommand(new CQRS.Models.Entities.Command('CalculatorCommand', 'onSumNoAggregate', { a: random(options), b: random(options) }));
            i++;
        }
        break;
        //it will test the service bus only
        case 'BUS':
        while (i < 100) {
            CQRS.ServiceLocator.Process.Instance.publishCommand(new CQRS.Models.Entities.Command('CalculatorCommand', 'message', { a: random(options), b: random(options) }));
            i++;
        
        }
        break;
        default:
        //It will test the CQRS process, no Query view added because the user can define any. 
        case 'CQRS':
        while (i < 100) {
            CQRS.ServiceLocator.Process.Instance.publishCommand(new CQRS.Models.Entities.Command('CalculatorCommand', 'sum', { a: random(options), b: random(options) }));
            i++;
        }
        break;
    }
 
    
});
processQ().then(() => {
    console.log('completed');
}, Error => {

    console.log('Error', Error);
});
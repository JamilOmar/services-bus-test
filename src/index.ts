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
    //when there is an error in the channel
    CQRS.ServiceLocator.Process.Instance.onEvent(CQRS.Common.Constants.Events.CHANNEL_ERROR, (x: any) => {
        console.log('channelError', x);

    })
    //when there is an error in the connection
    CQRS.ServiceLocator.Process.Instance.onEvent(CQRS.Common.Constants.Events.CONNECTION_ERROR, (x: any) => {
        console.log('connectionError', x);

    })
    //when the message is processed (only consumer)
    CQRS.ServiceLocator.Process.Instance.onEvent(CQRS.Common.Constants.Events.MESSAGE_PROCESSED, (x: any) => {
        console.log('Message Processed')
    })
    let i = 0;
    switch(process.env.TEST){
        //It will test the CQRS without Aggregates and Event's store
        case 'NOCQRS':
        while (i < 100) {
            CQRS.ServiceLocator.Process.Instance.publishCommand(new CQRS.Models.Entities.Command('CalculatorCommand', 'sumNoAggregate', { a: random(options), b: random(options) , id:i}));
            i++;
        }
        break;
        //it will test the service bus only
        case 'BUS':
        while (i < 100) {
            CQRS.ServiceLocator.Process.Instance.publishCommand(new CQRS.Models.Entities.Command('CalculatorCommand', 'message', { a: random(options), b: random(options), id:i }));
            i++;
        
        }
        break;
        default:
        //It will test the CQRS process, no Query view added because the user can define any. 
        case 'CQRS':
        while (i < 100) {
            CQRS.ServiceLocator.Process.Instance.publishCommand(new CQRS.Models.Entities.Command('CalculatorCommand', 'sum', { a: random(options), b: random(options) , id:i}));
            i++;
        }
        break;
         //It will test the Query to the Report's storage, it is required to run CQRS first.
         case 'REPORT':
           
            //Query a report
            //ReportCommand.name : The name of the report Handler (Report)
            //ReportCommand.method : The name of the method to be invoked (result)
            //ReportCommand.command : The command or object to be sent (data)
             let data =yield CQRS.ServiceLocator.Process.Instance.query(new CQRS.Models.Entities.ReportCommand('Report', 'result', { id:'test' }))
             console.log(data);
         break;
    }
 
    
});
processQ().then(() => {
    console.log('Handlers loaded');
}, Error => {

    console.log('Error', Error);
});
import * as Q from 'q';
import * as _ from 'lodash';
import * as CQRS from "@labshare/services-bus";
const ServicesCache = require('@labshare/services-cache').Cache;
const config = require('../../config.json')
export default class Result extends CQRS.Reporting.ReportHandler<any> {
    
   
    constructor() {
        super();
        this.reportDatabase = new ServicesCache(config.sb.eventStore.redis, config.sb.eventStore.maxTime);
        
    }
     // method for test
    result(data: any): Promise<any> {
        return  this.reportDatabase.getAllObjectsList('calculator-storage').
        then(d=>{
            console.log('data sent: ',data);
            return d;
        });
    }

}
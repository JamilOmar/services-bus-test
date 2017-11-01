'use strict';

//Reference to @labshare/services-bus
import { Models } from '@labshare/services-bus';
import * as Q from 'q';
import * as _ from 'lodash';
let config = require('../../config.json');
//Inherit from Aggregate
export class Calculator extends Models.Entities.Aggregate {
    public id: string;
    public name: string;
    constructor(id?: string) {
        super(id);
    }
    sum(a:number ,b:number,id:number): Promise<any>
    {
        let self = this;
        return new Promise((resolve, reject) => {            
            //Simulate Interval;
            setInterval(() => {
                // Calling event onSum and adding the machine name
                self.apply('onSum',{a,b,c:a+b , machineName:config.calculator.name ,id});
                resolve();
            }, 10000);
        });
    }
}


import * as CQRS from '@labshare/services-bus';
export default class Calculator extends CQRS.Commands.CommandHandler {
    constructor();
    sum(data: any): Promise<any>;
    sumNoAggregate(data: any): Promise<any>;
    message(data: any): Promise<any>;
}

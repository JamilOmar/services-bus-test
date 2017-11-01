import * as CQRS from '@labshare/services-bus';
export default class Calculator extends CQRS.Events.EventHandler<any> {
    constructor();
    onSum(data: CQRS.Models.Entities.DomainEvent): Promise<any>;
    onSumNoAggregate(data: any): Promise<any>;
}

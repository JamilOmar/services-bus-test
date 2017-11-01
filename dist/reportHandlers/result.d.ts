import * as CQRS from "@labshare/services-bus";
export default class Result extends CQRS.Reporting.ReportHandler<any> {
    constructor();
    result(data: any): Promise<any>;
}

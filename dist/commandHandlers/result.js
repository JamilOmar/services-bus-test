"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Result {
    constructor() {
    }
    // method for only test the bus
    result(data) {
        return new Promise((resolve, reject) => {
            console.log('Result: ', data);
            resolve();
        });
    }
}
exports.default = Result;

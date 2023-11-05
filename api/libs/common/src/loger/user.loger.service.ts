import { Injectable } from '@nestjs/common';

@Injectable()
export class  LoggerService {
    constructor() {}

    actionLog(serviceName: string, functionName: string, action: string, data: any): void {
        const resetColor = "\x1b[0m";
        const redColor = "\x1b[31m";
	const lightRed = "\x1b[91m";
	const brightBlue = "\x1b[94m";
	const brightMagenta = "\x1b[95m";
	const brightCyan = "\x1b[96m";

        console.log(`${brightBlue}[${serviceName}]${resetColor} - ${brightCyan}[${functionName}]${resetColor} - ${brightMagenta}${action}:${resetColor} ${lightRed}${data}${resetColor}`);
    }
}


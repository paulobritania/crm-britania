export interface CronOptions {
    name?: string;
    timeZone?: string;
    utcOffset?: string | number;
    unrefTimeout?: boolean;
}
export declare function Cron(cronTime: string | Date, options?: CronOptions): MethodDecorator;

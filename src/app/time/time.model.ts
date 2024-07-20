export interface Time {
    hours: number;
    minutes: number;
    day?: number;
    month?: string;
    unixTime?: number;
    timezone?: string;
}

export interface TimeResponse {
    unixtime: number;
    timezone: string;
    datetime: string;
}
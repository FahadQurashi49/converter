export interface Time {
    meridianHours: string;
    minutes: string;
    meridian: 'AM' | 'PM';

}

export interface TimeResponse {
    unixtime: number;
    timezone: string;
    datetime: string;
}
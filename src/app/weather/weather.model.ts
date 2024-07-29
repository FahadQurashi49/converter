export interface Weather {
    temparature: number;
}

export interface WeatherResponse {
    current: { temp_c: number, temp_f: number };
}
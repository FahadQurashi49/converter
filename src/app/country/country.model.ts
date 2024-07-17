export interface Country {
    id: number;
    name: string;
    timezone: string;
}

export interface CountryResponse {
    countryList: Country;
}
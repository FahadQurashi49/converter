export interface Country {
    id: number;
    name: string;
    timezone: string;
    currency: string;
}

export interface CountryResponse {
    countryList?: Country[];
}
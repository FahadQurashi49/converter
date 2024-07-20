export interface Country {
    id: number;
    name: string;
    timezone: string;
    isCurrent: boolean;
}

export interface CountryResponse {
    countryList?: Country[];
}
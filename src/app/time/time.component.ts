import { Component, OnInit, input } from '@angular/core';
import { Country } from '../country/country.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [],
  templateUrl: './time.component.html',
  styleUrl: './time.component.css'
})
export class TimeComponent implements OnInit {

  selectedCountry = input.required<Country>();

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    // this.countryResponse$ = this.httpClient.get<CountryResponse>('http://localhost:3000/country');
    //   this.countries$ = this.countryResponse$.pipe(
    //     map((response: any) => {
    //       return response.countryList
    //     })
    //   );
    
    // this.httpClient.get('https://worldtimeapi.org/api/timezone/' + this.selectedCountry().timezone)
  }

  
}

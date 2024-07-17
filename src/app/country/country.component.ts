import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Country, CountryResponse } from './country.model';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent {

  countryResponse$: Observable<CountryResponse>;
  countries$: Observable<Country[]>

  constructor(private httpClient: HttpClient) {
      // this.countries$ = this.httpClient.get('http://localhost:3000/countries').pipe(
      // map((response: any) => <Country[]> response.json()));
      this.countryResponse$ = this.httpClient.get<CountryResponse>('http://localhost:3000/country');
      this.countries$ = this.countryResponse$.pipe(
        map((response: any) => {
          return response.countryList
        })
      );


  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, model, signal } from '@angular/core';
import { Country, CountryResponse } from './country.model';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent implements OnInit {

  countryResponse$: Observable<CountryResponse>;
  countries$: Observable<Country[]>;
  
  countries = signal<Country[]>([]);
  // selectedCountryId = model.required<number | undefined>();
  selectedCountry = model.required<Country>();
  selectedCountryId: number = 5;

  ngOnInit(): void {
    this.selectedCountryId = this.selectedCountry().id;
  }
  

  constructor(private httpClient: HttpClient) {
      this.countryResponse$ = this.httpClient.get<CountryResponse>('http://localhost:3000/country');
      this.countries$ = this.countryResponse$.pipe(
        map((response: any) => {
          return response.countryList
        })
      );
      this.countries$.subscribe((countries: Country[]) => this.countries.set(countries));
      
  }
  
  
  public onCountrySelectionChange(event: any) {
    const countryId = event?.target?.value;
    const selectedCountry = this.countries().filter(
      (country: Country) => country.id === countryId
    ).pop();
    this.selectedCountry.set(selectedCountry!);
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Signal, model, signal } from '@angular/core';
import { Country, CountryResponse } from './country.model';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent implements OnInit {

  selectedCountry = model.required<Country>();
  countries: Country[] | undefined;
  countryResponse:  Signal<CountryResponse>
  selectedCountryId: number = 5;

  ngOnInit(): void {
    this.selectedCountryId = this.selectedCountry().id;
  }
  

  constructor(private httpClient: HttpClient) {
    this.countryResponse = 
      toSignal(this.httpClient.get<CountryResponse>('http://localhost:3000/country'), { initialValue: { countryList: [] }, requireSync: false });  
  }
  
  
  public onCountrySelectionChange(event: any) {
    const countryId = event?.target?.value;
    const selectedCountry = this.countryResponse()?.countryList?.filter(
      (country: Country) => country.id === countryId
    ).pop();
    this.selectedCountry.set(selectedCountry!);
  }

}

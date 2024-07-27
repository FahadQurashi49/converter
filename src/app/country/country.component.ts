import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Signal, model } from '@angular/core';
import { Country, CountryResponse } from './country.model';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { toSignal } from '@angular/core/rxjs-interop';
import { serverApiEndPoint } from '../../apiKeys';


@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent implements OnInit {

  selectedCountry = model.required<Country>();
  countryResponse:  Signal<CountryResponse>
  selectedCountryId: number = 5;

  ngOnInit(): void {
    this.selectedCountryId = this.selectedCountry().id;
  }
  

  constructor(private httpClient: HttpClient) {
    const countryResponse$ = 
      this.httpClient.get<CountryResponse>(serverApiEndPoint)
      .pipe(
        catchError((err: any) => {
          console.error('Unable to fetch country list: ', err);
          return of({ countryList: [this.selectedCountry()] });
        })
      )
    this.countryResponse = 
      toSignal(countryResponse$, { initialValue: { countryList: [] }, requireSync: false });  
  }
  
  
  public onCountrySelectionChange(event: any) {
    const countryId = event?.target?.value;
    const selectedCountry = this.countryResponse()?.countryList?.filter(
      (country: Country) => country.id === countryId
    ).pop();
    this.selectedCountry.set(selectedCountry!);
  }

}

import { Component, OnInit, input, model, signal } from '@angular/core';
import { Country } from '../country/country.model';
import { CurrencyResponse } from './currency.model';
import { HttpClient } from '@angular/common/http';
import { currencyApiEndPoint } from '../../apiKeys';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.css'
})
export class CurrencyComponent implements OnInit {

  selectedCountry = input.required<Country>();
  baseCurrencyCode = 'USD';
  
  currencyMap = signal<Map<string, number>>(new Map());
  errorMsg = model.required<string>();

  constructor(private httpClient: HttpClient) {
    // fetch currencies on ngOnInit b/c it does not have any dep on selectedCountry signal
  }
  ngOnInit(): void {
    this.errorMsg.set('');
    const currencyResponse$ = this.httpClient
      .get<CurrencyResponse>(currencyApiEndPoint)
      .pipe(
        catchError((err: any) => {
          console.error('Unable to fetch currencies data: ', err);
          this.errorMsg.set('Unable to fetch currencies data');
          return  of({ data: {} });
        })
      );
  
      currencyResponse$.subscribe((currencyResponse: CurrencyResponse) => {
      if (currencyResponse && currencyResponse.data && this.currencyMap().size === 0) {
        const keys = Object.keys(currencyResponse.data);
        keys.forEach((currencyCode) => { // keys of data object are currency code
          const currencyValue = Math.round(currencyResponse.data[currencyCode].value * 100) / 100;
          this.currencyMap().set(currencyCode, currencyValue);
        });
      }

    });
  }
}

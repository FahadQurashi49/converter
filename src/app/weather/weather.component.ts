import { Component, input, model, signal } from '@angular/core';
import { Country } from '../country/country.model';
import { toObservable } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { catchError, of, switchMap } from 'rxjs';
import { Weather, WeatherResponse } from './weather.model';
import { getWeatherApiEndPoint } from '../../apiKeys';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {

  selectedCountry = input.required<Country>();
  selectedCountry$ = toObservable(this.selectedCountry);
  weather = signal<Weather>({ temparature: 30 });
  errorMsg = model.required<string>();

  constructor(private httpClient: HttpClient) {

    const weatherResponse$ = this.selectedCountry$.pipe(
      switchMap((selectedCountry: Country) => {
        this.errorMsg.set('');
        const weatherApiEndpoint = getWeatherApiEndPoint(selectedCountry.timezone);
        return this.httpClient.get<WeatherResponse>(weatherApiEndpoint);
      }),
      catchError((err: any) => {
        console.error('Unable to fetch weather data: ', err);
        this.errorMsg.set('Unable to fetch weather data');
        return of({current: { temp_c: 30, temp_f: 97 }});
      })
    );

    weatherResponse$.subscribe((weatherResp: WeatherResponse) => 
      this.weather.set({ temparature: Math.floor(weatherResp.current.temp_c) }));
  }

  

}

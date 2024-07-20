import { Component, input, signal } from '@angular/core';
import { Country } from '../country/country.model';
import { toObservable } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { TimeResponse } from '../time/time.model';
import { Weather, WeatherResponse } from './weather.model';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  private weatherApiKey = '';


  selectedCountry = input<Country>();
  selectedCountry$ = toObservable(this.selectedCountry);
  weather = signal<Weather>({ temparature: 30 });

  constructor(private httpClient: HttpClient) {

    const weatherResponse$ = this.selectedCountry$.pipe(
      switchMap((selectedCountry: Country | undefined) => {
        const weatherApiEndpoint = this.getWeatherApiEndPoint(this.selectedCountry()?.timezone);
        return this.httpClient.get<WeatherResponse>(weatherApiEndpoint);
      }
      ));

    weatherResponse$.subscribe((weatherResp: WeatherResponse) => 
      this.weather.set({ temparature: Math.floor(weatherResp.current.temp_c) }));
  }

  private getWeatherApiEndPoint(timeZone: string | undefined): string {
    if (timeZone) {
      const city = timeZone.split('/').pop();
      return `http://api.weatherapi.com/v1/current.json?key=${this.weatherApiKey}&q=${city}&aqi=no`;
    }
    return '';

  }

}

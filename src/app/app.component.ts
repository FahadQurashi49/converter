import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { TimeComponent } from './time/time.component';
import { CurrencyComponent } from './currency/currency.component';
import { WeatherComponent } from './weather/weather.component';
import { Country } from './country/country.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CountryComponent, TimeComponent, CurrencyComponent, WeatherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  initialCountry: Country = { id: 5, name: "Pakistan", isCurrent: true, timezone: "Asia/Karachi" }
  selCountry = signal<Country>(this.initialCountry);

  // onSelectedCountryChange (country: any) {
  //   console.log(country);
  // }
}

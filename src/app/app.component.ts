import { Component, model, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { TimeComponent } from './time/time.component';
import { CurrencyComponent } from './currency/currency.component';
import { WeatherComponent } from './weather/weather.component';
import { Country } from './country/country.model';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CountryComponent, TimeComponent, CurrencyComponent, WeatherComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  initialCountry: Country = { id: 5, name: "Pakistan", currency: 'PKR', timezone: "Asia/Karachi" }
  selCountry = signal<Country>(this.initialCountry);
  errorMsg = signal<string>('');

  // onSelectedCountryChange (country: any) {
  //   console.log(country);
  // }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { TimeComponent } from './time/time.component';
import { CurrencyComponent } from './currency/currency.component';
import { WeatherComponent } from './weather/weather.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CountryComponent, TimeComponent, CurrencyComponent, WeatherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}

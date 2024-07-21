import { Component, input } from '@angular/core';
import { Country } from '../country/country.model';

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.css'
})
export class CurrencyComponent {
  selectedCountry = input<Country>();
}

import { Component, OnInit, input, effect, signal, Signal } from '@angular/core';
import { Country } from '../country/country.model';
import { HttpClient } from '@angular/common/http';
import { Time, TimeResponse } from './time.model';
import { CommonModule } from '@angular/common';
import { Observable, map, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time.component.html',
  styleUrl: './time.component.css'
})
export class TimeComponent {

  selectedCountry = input.required<Country>();
  selectedCountry$ = toObservable(this.selectedCountry);
  time = signal<Time>({ hours: 0, minutes: 0});

  constructor(private httpClient: HttpClient) {
    const timeResponse$ = this.selectedCountry$.pipe(
      switchMap((selectedCountry: Country ) =>  
        this.httpClient.get<TimeResponse>('https://worldtimeapi.org/api/timezone/' + selectedCountry.timezone))
    );
    timeResponse$.subscribe((timeResp: TimeResponse) => {
      const timeStr = timeResp?.datetime?.match(/T(\d{2}:\d{2}):/)?.pop();
      const hours = parseInt(timeStr?.split(':').shift() || '');
      const minutes = parseInt(timeStr?.split(':').pop() || '');
      console.log('from time component', { hours, minutes });
      this.time.set({ hours, minutes});
    });
  }
}

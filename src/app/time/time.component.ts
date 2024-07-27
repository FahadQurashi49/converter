import { Component, input, signal } from '@angular/core';
import { Country } from '../country/country.model';
import { HttpClient } from '@angular/common/http';
import { Time, TimeResponse } from './time.model';
import { CommonModule } from '@angular/common';
import { catchError, of, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

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
  time = signal<Time>({ meridianHours: '12', minutes: '00', meridian: 'AM'});

  constructor(private httpClient: HttpClient) {
    let timeResponse$ = this.selectedCountry$.pipe(
      switchMap((selectedCountry: Country ) =>  
        this.httpClient.get<TimeResponse>('https://worldtimeapi.org/api/timezone/' + selectedCountry.timezone)),
      catchError((err: any) => {
        console.error('Unable to fetch time data: ', err);
        return of({ datetime: 'T00:00:'});
      })
    );
    
    timeResponse$.subscribe((timeResp: TimeResponse) => { 
      const timeStr = timeResp?.datetime?.match(/T(\d{2}:\d{2}):/)?.pop();
      // extract hours and minute strings from the response
      const hoursStr = timeStr?.split(':').shift() || '';
      let minutesStr =  timeStr?.split(':').pop() || '';
      // parse hours and minutes to int for further processing
      const hours = parseInt(hoursStr);
      const minutes = parseInt(minutesStr);
      
      // convert hours to 12-hour time
      const meridian = hours < 12 ? 'AM' : 'PM';
      const meridianHour = hours % 12 || 12;
      // convert meridian hour to string to contain a leading 0 if meridian hour is less than 10
      // e.g.: 03
      const meridianHourStr = meridianHour < 10 ? `0${meridianHour}` : meridianHour.toString();
      
      // convert minutes to string to contain a leading 0 if minutes is less than 10
      // e.g.: 03
      // minutesStr = minutes < 10 ? `0${minutesStr}` : minutesStr;
      console.log('from time component', { hours, minutes });

      this.time.set({ meridianHours: meridianHourStr, minutes: minutesStr, meridian: meridian });
    });
  }
}

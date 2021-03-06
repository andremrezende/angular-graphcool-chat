import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  timeDifference: number;

  constructor(private http: HttpClient) {
    this.getDifference();
   }

  getDifference(): void {
    if(!this.timeDifference) {
      this.http.get('http://worldclockapi.com/api/json/utc/now').pipe(take(1)).subscribe(res => {
        this.timeDifference = new Date(res['currentDateTime']).getTime() - Date.now();
      });
    }
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {Payload} from '../model/payload';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private serviceUrl = 'http://localhost:4040/api';  // URL to web api

  constructor(private http: HttpClient) {

  }

  public createIcal(payload: Payload){
    return this.http.post(this.serviceUrl + '/generate', payload, httpOptions)
      .pipe(
        catchError(this.handleError<Payload>('createIcal'))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`CalendarService: ${message}`);
  }

}

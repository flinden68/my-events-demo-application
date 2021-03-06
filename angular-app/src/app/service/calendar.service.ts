import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {Payload} from '../model/payload';
import {Account} from "../model/account";


const reqHeader = new HttpHeaders({
    'Accept': 'text/html, application/xhtml+xml, */*',
    'Content-Type': 'application/json'
  })


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private serviceUrl = 'http://localhost:4041/api';  // URL to web api



  constructor(private http: HttpClient) {
  }

  public createIcal(payload: Payload){
    return this.http.post(this.serviceUrl + '/generate', payload, {headers:reqHeader, responseType: 'text'})
      .pipe(
        catchError(this.handleError('create Ical', []))
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

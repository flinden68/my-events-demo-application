import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {Event} from '../model/event';
import {Account} from "../model/account";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private serviceUrl = 'http://localhost:3535/api';  // URL to web api

  constructor(private http: HttpClient) {

  }

  public create(event: Event): Observable<Event>{
    return this.http.post(this.serviceUrl + '/event/create', event, httpOptions)
      .pipe(
        tap((event:Event) => this.log(`added event w/ id=${event.getId()}`)),
        catchError(this.handleError<Event>('create Event'))
      );
  }

  public update(id: string, event: Event): Observable<Event>{
    return this.http.put(this.serviceUrl + '/event/update/' + id, event, httpOptions)
      .pipe(
        tap((event: Event) => this.log(`updated event w/ id=${event.getId()}`)),
        catchError(this.handleError<Event>('update Event'))
      );
  }

  public delete(event: Event){
    return this.http.delete(this.serviceUrl + '/event/delete/' + event.getId(), httpOptions)
      .pipe(
        catchError(this.handleError('delete Event', []))
      );
  }

  public fetchaAllEventsByUserId(userid : string){
    return this.http.get<Event[]>(this.serviceUrl + '/events/' + userid, httpOptions)
      .pipe(
        catchError(this.handleError('fetchaAllEventsByUserId', []))
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`TopicService: ${message}`);
  }
}

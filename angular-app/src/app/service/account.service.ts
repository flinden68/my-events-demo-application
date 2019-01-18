import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {Account} from '../model/account';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private serviceUrl = 'http://localhost:3535/api';  // URL to web api

  constructor(private http: HttpClient) {

  }

  public create(account: Account): Observable<Account>{
    return this.http.post(this.serviceUrl + '/account/create', account, httpOptions)
      .pipe(
        tap((account:Account) => this.log(`added account w/ id=${account.getId()}`)),
        catchError(this.handleError<Account>('create Account'))
      );
  }

  public update(id: string, account: Account): Observable<Account>{
    return this.http.put(this.serviceUrl + '/account/update/' + id, account, httpOptions)
      .pipe(
        tap((account:Account) => this.log(`updated account w/ id=${account.getId()}`)),
        catchError(this.handleError<Account>('update Account'))
      );
  }

  public delete(account: Account){
    return this.http.delete(this.serviceUrl + '/account/delete/' + account.getId(), httpOptions)
      .pipe(
        catchError(this.handleError('delete Account', []))
      );
  }

  public fetchByEmail(account: Account){
    return this.http.get<Account>(this.serviceUrl + '/account/email/' + account.getEmail(), httpOptions)
      .pipe(
        catchError(this.handleError('fetch Account by Email', []))
      );
  }

  public fetchById(account: Account){
    return this.http.get<Account>(this.serviceUrl + '/account/id/' + account.getId(), httpOptions)
      .pipe(
        catchError(this.handleError('fetch Account by ID', []))
      );
  }

  public fetch(account: Account){
    return this.http.get<Account>(this.serviceUrl + '/account/id/' + account.getId(), httpOptions)
      .pipe(
        catchError(this.handleError('fetch Account', []))
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
    console.log(`AccountService: ${message}`);
  }
}

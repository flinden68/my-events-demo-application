import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {Account} from '../model/account';
import {TranslateService} from "@ngstack/translate";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private account: Account;
  private serviceUrl = 'http://localhost:3536/api';  // URL to web api

  constructor(private http: HttpClient, private translate: TranslateService) {

  }

  accountChanged = new EventEmitter<{
    previousAccount: Account;
    currentAccount: Account;
  }>();

  set activeAccount(value: Account) {
    const previousAccount = this.account;
    const newAccount = value || null;
    const changed = newAccount !== previousAccount;

    if (changed) {
      this.account = newAccount;
      this.translate.activeLang = this.account.language;
      this.accountChanged.next({
          previousAccount: previousAccount,
          currentAccount: newAccount
      });
    }
  }

  public getAccount():Account{
    return this.account;
  }

  public isAuthenticated():boolean{
    return this.account ? true : false;
  }

  public logout(){
    this.account = null;
  }

  public create(account: Account){
    return this.http.post<Account>(this.serviceUrl + '/account/create', account, httpOptions)
      .pipe(
        catchError(this.handleError<Account>('create Account'))
      );
  }

  public update(id: string, account: Account){
    return this.http.put<Account>(this.serviceUrl + '/account/update/' + id, account, httpOptions)
      .pipe(
        catchError(this.handleError<Account>('update Account'))
      );
  }

  public delete(account: Account){
    return this.http.delete(this.serviceUrl + '/account/delete/' + account._id, httpOptions)
      .pipe(
        catchError(this.handleError<Account>('delete Account'))
      );
  }

  public fetchByEmail(account: Account){
    return this.http.get<Account>(this.serviceUrl + '/account/email/' + account.email, httpOptions)
      .pipe(
        catchError(this.handleError<Account>('fetchByEmail Account'))
      );
  }

  public fetchById(account: Account){
    return this.http.get<Account>(this.serviceUrl + '/account/id/' + account._id, httpOptions)
      .pipe(
        catchError(this.handleError<Account>('fetchById Account'))
      );
  }

  public fetch(account: Account){
    return this.http.get<Account>(this.serviceUrl + '/account/id/' + account._id, httpOptions)
      .pipe(
        catchError(this.handleError<Account>('fetch Account'))
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

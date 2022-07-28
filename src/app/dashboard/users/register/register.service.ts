import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'https://api-devs.papaden.org/dashboard/users/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  urlParams: string = '';
  urlPrefix: string = '';
  urlKeys: string = '';
  urlKeysPrefix: string = '';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllUsersRegister() {
    if (this.urlParams) {
      this.urlPrefix = this.urlParams;
    } else {
      this.urlPrefix = 'register';
    }

    if (this.urlKeys) {
      this.urlKeysPrefix = '?search=' + this.urlKeys
    } else {
      this.urlKeysPrefix = ''
    }
    return this.httpClient.get(this.apiUrl + this.urlPrefix + this.urlKeysPrefix)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  pagsButton(params: string) {
    this.urlParams = params;
    this.getAllUsersRegister();
  }

  pagsSearch(keys: any) {
    this.urlKeys = keys;
    this.getAllUsersRegister();
  }

  delUsersRegister(ids: any) {
    return this.httpClient.delete(this.apiUrl + 'register/' + ids)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  validateUsersRegister(emails: any) {
    return this.httpClient.post( this.apiUrl + 'register/vals', JSON.stringify(emails), this.httpOptions);
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage : string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

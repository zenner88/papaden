import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {

  private apiConsultantUrl = 'https://api-devs.papaden.org/dashboard/';

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

  getAllConsultant() {
    if (this.urlParams) {
      this.urlPrefix = this.urlParams;
    } else {
      this.urlPrefix = 'consultant';
    }

    if (this.urlKeys) {
      this.urlKeysPrefix = '?search=' + this.urlKeys
    } else {
      this.urlKeysPrefix = ''
    }
    return this.httpClient.get( this.apiConsultantUrl + this.urlPrefix + this.urlKeysPrefix)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  pagsButton(params: string) {
    this.urlParams = params;
    this.getAllConsultant();
  }

  pagsSearch(keys: any) {
    this.urlKeys = keys;
    this.getAllConsultant();
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

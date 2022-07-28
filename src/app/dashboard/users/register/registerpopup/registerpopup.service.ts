import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterpopupService {

  private apiUrl = 'https://api-devs.papaden.org/dashboard/users/register/';
  private configUrl = 'https://api-devs.papaden.org/dashboard/config/sex';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  createUserRegister(vars: any) {
    return this.httpClient.post(this.apiUrl, JSON.stringify(vars), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getSexCategory() {
    return this.httpClient.get(this.configUrl)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private apiMemberUrl = 'https://api-devs.papaden.org/dashboard/users/';

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

  getAllUsersMember() {
    if (this.urlParams) {
      this.urlPrefix = this.urlParams;
    } else {
      this.urlPrefix = 'member';
    }

    if (this.urlKeys) {
      this.urlKeysPrefix = '?search=' + this.urlKeys
    } else {
      this.urlKeysPrefix = ''
    }
    return this.httpClient.get( this.apiMemberUrl + this.urlPrefix + this.urlKeysPrefix)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  pagsButton(params: string) {
    this.urlParams = params;
    this.getAllUsersMember();
  }

  pagsSearch(keys: any) {
    this.urlKeys = keys;
    this.getAllUsersMember();
  }

  delUsersMember(ids: any) {
    return this.httpClient.delete(this.apiMemberUrl + 'member/' + ids)
      .pipe(
        catchError(this.errorHandler)
      )
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

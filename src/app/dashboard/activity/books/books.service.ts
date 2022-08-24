import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0YjE4YTZjMS0yYmM0LTRmYjItODI2Yi1kM2UwMWQ3NzFjMWIiLCJpYXQiOjE2NjAzOTIyODR9.KVJgiE4gBXU5aiAISdelrmlmytxztiQaQo9buhd_Osg"
  
  private apiBornUrl = 'https://api-devs.papaden.org/useractivity/born';
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  }

  urlParams: string = '';
  urlPrefix: string = '';
  urlKeys: string = '';
  urlKeysPrefix: string = '';
  kategori: any;
  apiMemberUrl: string | undefined;

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllUsersMember() {
    if (this.kategori) {
      var urlPrefix: any = this.kategori;
    } else {
      var urlPrefix: any = '';
    }
    // this.apiMemberUrl = 'https://api-devs.papaden.org/useractivity/books?born_category_title='+urlPrefix;
    this.apiMemberUrl = 'https://api-devs.papaden.org/dashboard/activity/books';

    return this.httpClient.get( this.apiMemberUrl, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getBorn() {
    return this.httpClient.get( this.apiBornUrl, this.httpOptions)
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

  byKategori(keys: any) {
    this.kategori = keys;
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

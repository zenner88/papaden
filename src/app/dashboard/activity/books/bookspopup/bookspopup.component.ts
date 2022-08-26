import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-bookspopup',
  templateUrl: './bookspopup.component.html',
  styleUrls: ['./bookspopup.component.sass']
})
export class BookspopupComponent implements OnInit {
  editForm!: FormGroup;
  book_id: any;
  status: any;
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar
    ) { }
    
    
    
  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      status: ['',[Validators.required,]],
      book_id: ['',[Validators.required,]],
    });

    let dataEdit: any = localStorage.getItem("BookStatus");
    let data = JSON.parse(dataEdit);
    this.book_id = data.book_id;
    this.status = data.status;

  }

  editMember(){
    console.log(this.editForm.value)
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0YjE4YTZjMS0yYmM0LTRmYjItODI2Yi1kM2UwMWQ3NzFjMWIiLCJpYXQiOjE2NjAzOTIyODR9.KVJgiE4gBXU5aiAISdelrmlmytxztiQaQo9buhd_Osg"
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }
   
      let apiMemberUrl = 'https://api-devs.papaden.org/useractivity/books/updatestatus';
      this.httpClient.patch(apiMemberUrl, this.editForm.value, httpOptions).subscribe((data: any) => {
  
      console.log(data);
        if (data.statusCode == 200)
        {
          this._snackBar.open("Status Berhasil di Update", "OK")
        }else{
          this._snackBar.open("Status Tidak Valid!", "OK")
        }
       })  
    
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

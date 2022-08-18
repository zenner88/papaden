import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-memberpopup',
  templateUrl: './memberpopup.component.html',
  styleUrls: ['./memberpopup.component.sass']
})
export class MemberpopupComponent implements OnInit {
  editForm!: FormGroup;
  id: any;
  fullname: any;
  born_city: any;
  born_date: any;
  sex_category_title: any;
  phone: any;
  email: any;
  password: any;
  status: any;
  isvolunteer: any;
  isrecipient: any;
  created_on: any;
  updated_on: any;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar
    ) { }
    
    
    
  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      fullname: ['',[Validators.required,]],
      id: ['',[Validators.required,]],
      phone: ['',[Validators.required,]],
      email: ['',[Validators.required,]],
      isvolunteer: ['',[Validators.required,]],
      isrecipient: ['',[Validators.required,]],
    });

    let dataEdit: any = localStorage.getItem("userEdit");
    let data = JSON.parse(dataEdit);
    this.id = data.id;
    this.fullname = data.fullname;
    this.born_city = data.born_city;
    this.born_date = data.born_date;
    this.sex_category_title = data.sex_category_title;
    this.phone = data.phone;
    this.email = data.email;
    this.password = data.password;
    this.status = data.status;
    this.isvolunteer = data.isvolunteer;
    this.isrecipient = data.isrecipient;
    this.created_on = data.created_on;
    this.updated_on = data.updated_on;
  }

  editMember(){
    console.log(this.editForm.value)
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0YjE4YTZjMS0yYmM0LTRmYjItODI2Yi1kM2UwMWQ3NzFjMWIiLCJpYXQiOjE2NjAzOTIyODR9.KVJgiE4gBXU5aiAISdelrmlmytxztiQaQo9buhd_Osg"
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }
    let apiMemberUrl = 'http://202.67.10.240:3001/dashboard/users/member/'+this.editForm.value.id;
    this.httpClient.patch(apiMemberUrl, this.editForm.value, httpOptions).subscribe((data: any) => {

    console.log(data);
      if (data.statusCode == 200)
      {
        this._snackBar.open("Data Berhasil di Update", "OK")
      }else{
        this._snackBar.open("Data Tidak Valid!", "OK")
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

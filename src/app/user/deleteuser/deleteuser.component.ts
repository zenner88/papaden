import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.scss']
})
export class DeleteuserComponent implements OnInit {
  emailGet: any | undefined;
  message: string | undefined;
  isShowForm: boolean = false ;
  isShowS: boolean = true ;

  constructor(
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar,

  ) 
  { }

  ngOnInit(): void {
  }

  email(email: any){
    console.log(email)
    this.emailGet = email.target.value 
  }

  reqReset(){
    let apiBanner = 'https://api-devs.papaden.org/deleterequest/';
    console.log(apiBanner);
    let body = {
      "status" : "requested",
      "email"  : this.emailGet
    }
    this.httpClient.post<any>(apiBanner,body).subscribe({
      next: data => {
      const code = data.statusCode;
      console.log(data);
      if (data.statusCode == 200){
        this.message = "Permintaan Delete Account berhasil, silahkan periksa Inbox di Email : "+this.emailGet
        // this._snackBar.open(this.message, "OK", {duration: 5000})
        this.isShowForm = true;
        this.isShowS = false;
        console.log(this.message);
      }
    },
    error: error => {
      let errorMessage = error.message;
      // console.error('There was an error!', error);
      if (error.error.statusCode == 500 ){
        this.message = "Permintaan Delete Account gagal, pastikan Email yang Anda input benar : "+this.emailGet
        this._snackBar.open(this.message, "OK", {duration: 5000})
      }
  }
  })
  }

}

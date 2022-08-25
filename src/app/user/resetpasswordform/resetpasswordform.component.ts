import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resetpasswordform',
  templateUrl: './resetpasswordform.component.html',
  styleUrls: ['./resetpasswordform.component.scss']
})
export class ResetpasswordformComponent implements OnInit {
  emailGet: any | undefined;
  message: string | undefined;
  isShowForm: boolean = false ;
  isShowS: boolean = true ;

  constructor(
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) 
  { }

  ngOnInit(): void {
  }

  email(email: any){
    console.log(email)
    this.emailGet = email.target.value 
  }

  reqReset(){
    this.route.queryParams
      .subscribe(params => {
        let email = params['email'];
        console.log(email);
        let resetpasswordtoken = params['resetpasswordtoken'];
        console.log(resetpasswordtoken);
        let pass1 = (<HTMLInputElement>document.getElementById("password"))?.value;
        let pass2 = (<HTMLInputElement>document.getElementById("repassword"))?.value;
        console.log(pass1);
        console.log(pass2);
        if (pass1 == pass2){
          let body = {
            "password": pass1,
            "newpassword": pass2,
            "email" : email,
            "resetpasswordtoken": resetpasswordtoken
          }
          console.log(body);
          let apiBanner = 'https://api-devs.papaden.org/auth/newpassword';
          console.log(apiBanner);
          this.httpClient.post<any>(apiBanner, body).subscribe({
            next: data => {
            const code = data.statusCode;
            console.log(data);
            if (data.statusCode == 200){
              let message = "Permintaan reset password berhasil, silahkan periksa Inbox di Email : "
              console.log(message);
            }else if (data.statusCode == 500){
              let message = "Permintaan reset password gagal, pastikan Email yang Anda input benar "
              this._snackBar.open(message, "OK", {duration: 2000})
            }else if (data.statusCode == 400){
              let message = "password must be longer than or equal to 8 characters";
              this._snackBar.open(message, "OK", {duration: 2000})
            }else if (data.statusCode == 401){
            }
          },
          error: error => {
              let errorMessage = error.message;
              console.error('There was an error!', error);
              if (error.status == 400 ){
                let message = error.error.message[0] +" & "+ error.error.message[1];
                this._snackBar.open(message, "OK", {duration: 2000})
              }
          }
        })
        }else{
          let message = "Password Not Match";
          this._snackBar.open(message, "OK", {duration: 2000})
        }
      }
    );
    
  }

}

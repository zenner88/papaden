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
              this.message = "Reset Password Berhasil!"
              console.log(this.message);
              this.isShowForm = true;
              this.isShowS = false;
            }
            if (data.statusCode == 401 ){
              let message = data.message;
              this._snackBar.open(message, "OK", {duration: 5000})
            }
          },
          error: error => {
              console.error('There was an error!', error);
              if (error.status == 400 ){
                let message = error.error.message[0]+" & "+error.error.message[1];
                this._snackBar.open(message, "OK", {duration: 5000})
              }
             
          }
        })
        }else{
          let message = "Password Not Match";
          this._snackBar.open(message, "OK", {duration: 5000})
        }
      }
    );
    
  }

}

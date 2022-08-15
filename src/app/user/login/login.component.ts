import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  title = 'material-login';
  constructor(
    private router:Router, private _snackBar: MatSnackBar
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
   }
  ngOnInit(): void {
  }
  onSubmit(){
    let username = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    if(this.loginForm.valid){
      if (username == "papaden" && password == "papaden"){
        localStorage.setItem('user', JSON.stringify(this.loginForm.value))
        console.log(this.loginForm.value)
        this.router.navigate(['/dashboard'])
      } else{
        this._snackBar.open("Username atau Password Salah!", "OK")
        console.error("SALAH")
      }
    }else{
      return;
    }
  }
}
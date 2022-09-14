import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  emailGet: any | undefined;
  message: string | undefined;
  isShowForm: boolean = false ;
  isShowS: boolean = true ;
  star: any;

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

  getstar(data:any){
    console.log(data)
    this.star = data;
  }

  sendRating(){
    this.route.queryParams
      .subscribe(params => {
      let book_id = params['book_id'];
      let user_id = params['user_id'];
      let api = 'https://api-devs.papaden.org/useractivity/giverating';
      let body = {
        "book_id": book_id,
        "user_id": user_id,
        "rating": this.star
      }
      this.httpClient.post<any>(api, body).subscribe({
        next: data => {
        const code = data.statusCode;
        console.log(data);
        if (data.statusCode == 200){
          this.message = "Rating Berhasil Dikirim!"
          this._snackBar.open(this.message, "OK", {duration: 5000})
          this.isShowForm = true;
          this.isShowS = false;
          console.log(this.message);
        }
      },
      error: error => {
        let errorMessage = error.message;
        // console.error('There was an error!', error);
        if (error.error.statusCode == 500 ){
          this.message = "Gagal"
          this._snackBar.open(this.message, "OK", {duration: 5000})
        }
    }
    })
    }
  )}
}

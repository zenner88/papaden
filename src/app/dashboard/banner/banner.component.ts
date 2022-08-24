import { Component, OnInit, Input } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {SafePipe} from "./../../safe.pipe";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  FormBanner!: FormGroup;
  FormBanner1!: FormGroup;
  FormBanner2!: FormGroup;
  @Input() file1: any;
  @Input() file2: any;
  banner1show?: string;
  banner2show?: string;
  breakpoint?: number;
  banner: any;

  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
  ) { }
  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 4 : 2;
    this.FormBanner = this.formBuilder.group({
      identifier: ['',[Validators.required,]],
      type: ['',[Validators.required,]],
      url: [''],
      hyperlink: [''],
      file: [''],
    });
    this.FormBanner1 = this.formBuilder.group({
      file: ['',[Validators.required,]],
    });
    this.FormBanner2 = this.formBuilder.group({
      file: ['',[Validators.required,]],
    });
    this.banner1show = "https://api-devs.papaden.org:3000/images/carousel_image_1.png";
    this.banner2show = "https://api-devs.papaden.org:3000/images/carousel_image_2.png";

    let apiBanner = 'https://api-devs.papaden.org:3000/banner_link/';
    this.httpClient.get(apiBanner).subscribe((data: any) => {
      this.banner = data.data;
      let length = this.banner.length;
      console.log(this.banner);
      for (let i = 0; i < length; i++){
        this.FormBanner.patchValue({identifier: this.banner[i].identifier});
        // this.FormBanner.controls['identifier'].setValue(this.banner[i].identifier);
      }
    })
      
  }

  dataFile1(event: any){
    this.file1 = event.target.files[0];
    console.log(this.file1);
  }

  banner1(){
    const formData: FormData = new FormData();
    formData.append('file', this.file1);
    let apiMemberUrl = 'https://api-devs.papaden.org:3000/upload-image1';
    this.httpClient.post(apiMemberUrl, formData).subscribe((data: any) => {
    console.log(data);
      if (data.message == "File uploaded successfully.")
      {
        this._snackBar.open("Banner 1 Berhasil di Update", "OK", {duration: 3000})
        window.location.reload();
      }else{
        this._snackBar.open("Data Tidak Valid!", "OK", {duration: 3000})
      }
     })  
  }

  dataFile2(event: any){
    this.file2 = event.target.files[0];
    console.log(this.file1);

  }

  banner2(){
    const formData: FormData = new FormData();
    formData.append('file', this.file2);
    let apiMemberUrl = 'https://api-devs.papaden.org:3000/upload-image2';
    this.httpClient.post(apiMemberUrl, formData).subscribe((data: any) => {
    console.log(data);
      if (data.message == "File uploaded successfully.")
      {
        this._snackBar.open("Banner 2 Berhasil di Update", "OK", {duration: 3000})
        window.location.reload();
      }else{
        this._snackBar.open("Data Tidak Valid!", "OK", {duration: 3000})
      }
     })  
  }
 
  bannerGo(id:any){
    var identifier = (<HTMLInputElement>document.getElementById('identifier-'+id))?.value;
    var type = (<HTMLInputElement>document.getElementById('type-'+id))?.value;
    var hyperlink = (<HTMLInputElement>document.getElementById('hyperlink-'+id))?.value;
    var url = (<HTMLInputElement>document.getElementById('url-'+id))?.value;
    console.log(identifier)
    console.log(type)
    console.log(hyperlink)
    console.log(url)
    console.log(this.file1)
    

    const formData: FormData = new FormData();
      formData.append('identifier', identifier);
      formData.append('type', type);
      formData.append('url', url);
      formData.append('file', this.file1);
      formData.append('hyperlink', "https://api-devs.papaden.org:3000/images/"+hyperlink);

 
    const formData2 ={
      "type" : type,
      "url" : url
      }

    console.log(formData)
    if (type == 'image'){
      let apiMemberUrl = 'https://api-devs.papaden.org:3000/banner_link/'+identifier;
      this.httpClient.put(apiMemberUrl, formData).subscribe((data: any) => {
      console.log(data);
        if (data.message == "banner_link updated successfully")
        {
          this._snackBar.open("Media Berhasil di Update", "OK", {duration: 3000})
          setTimeout(function(){
            window.location.reload();
        }, 2000);
        }else{
          this._snackBar.open("Data Tidak Valid!", "OK", {duration: 3000})
        }
      })  
    }
    if (type == 'video'){
      let apiMemberUrl = 'https://api-devs.papaden.org:3000/banner_link/'+identifier;
      this.httpClient.put(apiMemberUrl, formData2).subscribe((data: any) => {
      console.log(data);
        if (data.message == "banner_link updated successfully")
        {
          this._snackBar.open("Media Berhasil di Update", "OK", {duration: 3000})
          setTimeout(function(){
            window.location.reload();
        }, 2000);
        }else{
          this._snackBar.open("Data Tidak Valid!", "OK", {duration: 3000})
        }
      })  
    }
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

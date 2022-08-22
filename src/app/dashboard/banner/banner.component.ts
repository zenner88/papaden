import { Component, OnInit, Input } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  FormBanner1!: FormGroup;
  FormBanner2!: FormGroup;
  @Input() file1: any;
  @Input() file2: any;
  banner1show?: string;
  banner2show?: string;
  breakpoint?: number;

  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
  ) { }
  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
    this.FormBanner1 = this.formBuilder.group({
      file: ['',[Validators.required,]],
    });
    this.FormBanner2 = this.formBuilder.group({
      file: ['',[Validators.required,]],
    });
    this.banner1show = "http://localhost:3000/images/carousel_image_1.png";
    this.banner2show = "http://localhost:3000/images/carousel_image_2.png";
  }

  dataFile1(event: any){
    this.file1 = event.target.files[0];
    console.log(this.file1);
  }

  banner1(){
    const formData: FormData = new FormData();
    formData.append('file', this.file1);
    let apiMemberUrl = 'http://localhost:3000/upload-image1';
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
    let apiMemberUrl = 'http://localhost:3000/upload-image2';
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
}

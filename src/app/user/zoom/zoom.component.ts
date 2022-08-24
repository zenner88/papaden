import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.sass']
})
export class ZoomComponent implements OnInit {
  banner: any | undefined;

  constructor(
    private _snackBar: MatSnackBar,
    private httpClient: HttpClient,
  ) { }
  value1 = "https://us05web.zoom.us/j/82440488692?pwd=cUlMamZWZVFjL0dRQVB2YWVjS28zUT09";
  ngOnInit(): void {
    let apiBanner = 'https://api-devs.papaden.org/banner_link/';
    this.httpClient.get(apiBanner).subscribe((data: any) => {
      this.banner = data.data;
      console.log(this.banner);
    })
  }
  notif(){
    this._snackBar.open("Link Berhasil di Salin!", "OK")
  }
}

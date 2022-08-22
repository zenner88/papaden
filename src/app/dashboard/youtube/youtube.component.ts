import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.sass']
})
export class YoutubeComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar

  ) { }
  value1 = "https://us05web.zoom.us/j/82440488692?pwd=cUlMamZWZVFjL0dRQVB2YWVjS28zUT09";
  ngOnInit(): void {
  }
  notif(){
    this._snackBar.open("Link Berhasil di Salin!", "OK")
  }
}

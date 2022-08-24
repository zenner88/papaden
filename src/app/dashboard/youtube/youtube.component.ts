import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.sass']
})
export class YoutubeComponent implements OnInit {
  link?: any | undefined;

  constructor(
    private _snackBar: MatSnackBar,
    private httpClient: HttpClient,


  ) { }
  ngOnInit(): void {
    let banner = 'https://api-devs.papaden.org/youtube';
    this.httpClient.get(banner).subscribe((data: any) => {
    console.log(data.data);
    this.link = data.data;
  }) 
}

link1(no:any){
  var data = (<HTMLInputElement>document.getElementById(no)).value;
  var body = {"link": data};
  var id = (<HTMLInputElement>document.getElementById('id'+no)).value;
  console.log(data,"+",id);
    
    let apiMemberUrl = 'https://api-devs.papaden.org/youtube/'+id;
    this.httpClient.put(apiMemberUrl, body).subscribe((data: any) => {
    console.log(data);
      if (data.message == 'Banner updated successfully')
      {
        this._snackBar.open("Data Berhasil di Update", "OK")
        window.location.reload();
      }else{
        this._snackBar.open("Data Tidak Valid!", "OK")
      }
     })  
  }
}

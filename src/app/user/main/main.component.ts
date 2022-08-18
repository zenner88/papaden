import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
  
  toDiv(index:any){
    console.log(index);
    (document.getElementById(index) as HTMLElement).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

}

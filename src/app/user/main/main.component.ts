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
    (<HTMLInputElement>document.getElementById('mobileNav')).style.display = "none";
    (<HTMLInputElement>document.getElementById('body')).style.overflow = "visible";
  }

  closeNav() {
    (<HTMLInputElement>document.getElementById('mobileNav')).style.display = "none";
    (<HTMLInputElement>document.getElementById('body')).style.overflow = "visible";
  }

  showNav() {
    (<HTMLInputElement>document.getElementById('mobileNav')).style.display = "block";
    (<HTMLInputElement>document.getElementById('body')).style.overflow = "hidden";
  }

  googlePlay() {
    window.open("https://play.google.com/store/apps/details?id=com.papaden.mobile")
  }
}

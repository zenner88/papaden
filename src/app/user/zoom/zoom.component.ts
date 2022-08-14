import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.sass']
})
export class ZoomComponent implements OnInit {

  constructor() { }
  value1 = "https://us05web.zoom.us/j/82440488692?pwd=cUlMamZWZVFjL0dRQVB2YWVjS28zUT09";
  ngOnInit(): void {
  }
}

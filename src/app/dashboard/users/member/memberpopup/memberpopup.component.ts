import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memberpopup',
  templateUrl: './memberpopup.component.html',
  styleUrls: ['./memberpopup.component.sass']
})
export class MemberpopupComponent implements OnInit {
  id: any;
  fullname: any;
  born_city: any;
  born_date: any;
  sex_category_title: any;
  phone: any;
  email: any;
  password: any;
  status: any;
  isvolunteer: any;
  isrecipient: any;
  created_on: any;
  updated_on: any;

  constructor() { }

  ngOnInit(): void {
    let dataEdit: any = localStorage.getItem("userEdit");
    let data = JSON.parse(dataEdit);
    this.id = data.id;
    this.fullname = data.fullname;
    this.born_city = data.born_city;
    this.born_date = data.born_date;
    this.sex_category_title = data.sex_category_title;
    this.phone = data.phone;
    this.email = data.email;
    this.password = data.password;
    this.status = data.status;
    this.isvolunteer = data.isvolunteer;
    this.isrecipient = data.isrecipient;
    this.created_on = data.created_on;
    this.updated_on = data.updated_on;
  }
}

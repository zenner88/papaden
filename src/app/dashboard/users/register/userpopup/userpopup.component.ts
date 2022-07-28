import {Component, Inject, OnInit} from '@angular/core';
import { UserpopupService } from "./userpopup.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RegisterIDS} from "../register";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-userpopup',
  templateUrl: './userpopup.component.html',
  styleUrls: ['./userpopup.component.sass']
})
export class UserpopupComponent implements OnInit {

  userRegisterForm = this.formBuilder.group({
    fullname: '',
    born_city: '',
    born_date: '',
    sex_category_title: '',
    phone: '',
    email: ''
  })

  idsData: any;
  idsConfigSex: any;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: RegisterIDS,
    public userpopupService: UserpopupService,
    private formBuilder: FormBuilder,
    public popUpRef: MatDialogRef<UserpopupComponent>
  ) { }

  ngOnInit(): void {
    this.getUserRegisterIds();
    this.getSexCategory();
  }

  getUserRegisterIds() {
    this.userpopupService.getUserRegisterIds(this.data).subscribe((data: any) => {
      this.idsData = data[0];
      this.userRegisterForm = this.formBuilder.group({
        fullname: [this.idsData.fullname],
        born_city: [this.idsData.born_city],
        born_date: [this.idsData.born_date],
        sex_category_title: [this.idsData.sex_category_title],
        phone: [this.idsData.phone],
        email: [this.idsData.email]
      })
    });
  }

  getSexCategory(){
    this.userpopupService.getSexCategory().subscribe((cats: any) => {
      this.idsConfigSex = cats.data;
    })
  }

  updateUserRegister() {
    this.userpopupService.updateUserRegister(this.data, this.userRegisterForm.value).subscribe(() => {
      this.popUpRef.close();
    })
  }
}

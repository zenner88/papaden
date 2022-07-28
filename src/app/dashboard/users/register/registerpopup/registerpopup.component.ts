import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RegisterpopupService} from "./registerpopup.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-registerpopup',
  templateUrl: './registerpopup.component.html',
  styleUrls: ['./registerpopup.component.sass']
})
export class RegisterpopupComponent implements OnInit {

  userCreateForm = this.formBuilder.group({
    fullname: '',
    born_city: '',
    born_date: '',
    sex_category_title: '',
    phone: '',
    email: '',
    password: ''
  })

  idsConfigSex: any;
  userWarn: string = '';
  defaultConfigSex: any;

  constructor(
    public registerpopupService: RegisterpopupService,
    private formBuilder: FormBuilder,
    public popUpCreateRef: MatDialogRef<RegisterpopupComponent>
  ) { }

  ngOnInit(): void {
    this.getSexCategory();
    this.userCreateForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      born_city: [''],
      born_date: [''],
      sex_category_title: [this.defaultConfigSex],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  getSexCategory(){
    this.registerpopupService.getSexCategory().subscribe((cats: any) => {
      this.idsConfigSex = cats.data;
      this.defaultConfigSex = this.idsConfigSex[0].sex_category_title;
    })
  }

  createUserRegisters() {
    console.log(JSON.stringify(this.userCreateForm.value));
    this.registerpopupService.createUserRegister(this.userCreateForm.value).subscribe((res: any) => {
       if (res.message === "email / nomer telepon pengguna telah terdaftar dan menunggu verifikasi") {
        this.userWarn = res.message;
       } else {
        this.popUpCreateRef.close();
        console.log(res);
      }
    })
  }
}

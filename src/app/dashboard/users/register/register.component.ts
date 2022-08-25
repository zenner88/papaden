import { Component, OnInit } from '@angular/core';
import { Register } from "./register";
import { RegisterService } from "./register.service";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { MatDialog } from "@angular/material/dialog";
import { UserpopupComponent } from "./userpopup/userpopup.component";
import { RegisterpopupComponent } from "./registerpopup/registerpopup.component";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerUsers: Register[] = [];
  dataSource: any;
  displayedColumns: string[] = ['id', 'fullname', 'born_city', 'born_date', 'sex_category_title', 'phone', 'email', 'action'];
  selection = new SelectionModel<Register>(true, []);
  first: string = '';
  previous: string = '';
  next: string = '';
  last: string = '';
  search: string ='';
  keys: string | undefined = '';
  numRows: undefined;

  searchForm = this.formBuilder.group({
    search: ''
  });

  constructor(
    public registerService: RegisterService,
    private formBuilder: FormBuilder,
    public popUp: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllUsersRegister();
  }

  getAllUsersRegister() {
    this.registerService.getAllUsersRegister().subscribe((data: any) => {
      this.registerUsers = data.items;
      this.dataSource = new MatTableDataSource<Register>(this.registerUsers);
      this.first = data.links.first;
      this.previous = data.links.previous;
      this.next = data.links.next;
      this.last = data.links.last;
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    if (typeof(this.dataSource) !== 'undefined') {
      this.numRows = this.dataSource.data.length;
    }
    return numSelected === this.numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Register): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  pagsButton(params: string) {
    this.registerService.pagsButton(params);
    return this.getAllUsersRegister()
  }

  pagsSearch() {
    this.registerService.pagsSearch(this.searchForm.get('search')?.value);
    return this.getAllUsersRegister()
  }

  delUsersRegister(ids: any) {
    return this.registerService.delUsersRegister(ids).subscribe(() => {
      this.getAllUsersRegister();
    });
  }

  validateUsers() {
    const emailsArr = this.selection.selected;
    const emails = emailsArr.map( user => (
      { 'email' : user.email }
    ));
    return this.registerService.validateUsersRegister(emails).subscribe(() => {
      this.getAllUsersRegister();
    });
  }

  validateUsersRegister(emails: any) {
    const verUsers = [
      {
        email: emails,
      }
    ]
    return this.registerService.validateUsersRegister(verUsers).subscribe(() => {
      this.getAllUsersRegister();
    });
  }

  popupUsersRegister(ids: any): void {
    const popUpRef = this.popUp.open(UserpopupComponent, {
      data: ids
    })
    popUpRef.afterClosed().subscribe(() => {
      this.getAllUsersRegister();
    });
  }

  popUsersCreate(): void{
    const popUpCreateRef = this.popUp.open(RegisterpopupComponent);
    popUpCreateRef.afterClosed().subscribe(() => {
      this.getAllUsersRegister();
    })
  }
}

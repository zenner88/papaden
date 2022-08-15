import { Component, OnInit } from '@angular/core';
import { Books } from "./books";
import { BooksService } from "./books.service";
import { SelectionModel } from "@angular/cdk/collections";
import { FormBuilder } from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit {

  memberUsers: Books[] = [];
  dataSource: any;
  displayedColumns: string[] = ['select', 'fullname', 'born_city', 'born_date', 'sex_category_title', 'phone', 'email', 'action'];
  selection = new SelectionModel<Books>(true, []);
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
    public booksService: BooksService,
    private formBuilder: FormBuilder,
    public popUpMember: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllUsersMember();
  }

  getAllUsersMember() {
    this.booksService.getAllUsersMember().subscribe((data: any) => {
      this.memberUsers = data.items;
      this.dataSource = new MatTableDataSource<Books>(this.memberUsers);
      this.first = data.links.first;
      this.previous = data.links.previous;
      this.next = data.links.next;
      this.last = data.links.last;
    });
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

  checkboxLabel(row?: Books): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  pagsButton(params: string) {
    this.booksService.pagsButton(params);
    return this.getAllUsersMember()
  }

  pagsSearch() {
    this.booksService.pagsSearch(this.searchForm.get('search')?.value);
    return this.getAllUsersMember();
  }

  delUsersRegister(ids: any) {
    return this.booksService.delUsersMember(ids).subscribe(() => {
      this.getAllUsersMember();
    });
  }

  // popUpMemberUpdate() {
  //   const popUpRef = this.popUpMember.open(MemberpopupComponent);
  //   popUpRef.afterClosed().subscribe(() => {
  //     this.getAllUsersMember();
  //   })
  // }

}

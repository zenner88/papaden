import { Component, OnInit } from '@angular/core';
import { Books } from "./books";
import { BooksService } from "./books.service";
import { SelectionModel } from "@angular/cdk/collections";
import { FormBuilder } from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {BookspopupComponent} from "./bookspopup/bookspopup.component";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit {

  memberUsers: Books[] = [];
  dataSource: any;
  displayedColumns: string[] = ['fullname', 'born_date', 'consultant_fullname', 'book_date', 'book_phone', 'book_tags', 'status',  'action'];
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
  Borns: any;

  constructor(
    public booksService: BooksService,
    private formBuilder: FormBuilder,
    public popUpMember: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllUsersMember();
    this.getBorn();
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

  kategoriUsiaGet(event:any){
    console.log(event);
    let kategori = event.target.textContent.trim()
    this.booksService.byKategori(kategori);
    return this.getAllUsersMember();
  }

  getBorn() {
    this.booksService.getBorn().subscribe((data: any) => {
      this.Borns = data.data;
      console.table(this.Borns);
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

  delBooks(ids: any) {
    return this.booksService.delUsersMember(ids).subscribe(() => {
      this.getAllUsersMember();
    });
  }

  popUpStatusUpdate(data:any){
    console.table(data)
    localStorage.setItem('BookStatus', JSON.stringify(data))
    const popUpRef = this.popUpMember.open(BookspopupComponent);
    popUpRef.afterClosed().subscribe(() => {
      this.getAllUsersMember();
      localStorage.removeItem('BookStatus')
    })
  }
}

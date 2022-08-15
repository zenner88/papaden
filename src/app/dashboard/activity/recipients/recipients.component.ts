import { Component, OnInit } from '@angular/core';
import { Recipients } from "./recipients";
import { RecipientsService } from "./recipients.service";
import { SelectionModel } from "@angular/cdk/collections";
import { FormBuilder } from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.sass']
})
export class RecipientsComponent implements OnInit {

  memberUsers: Recipients[] = [];
  dataSource: any;
  displayedColumns: string[] = ['select', 'fullname', 'born_city', 'born_date', 'sex_category_title', 'phone', 'email', 'action'];
  selection = new SelectionModel<Recipients>(true, []);
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
  Bantuan: any;

  constructor(
    public recipientsService: RecipientsService,
    private formBuilder: FormBuilder,
    public popUpMember: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllUsersMember();
    this.getBantuan();
  }

  getAllUsersMember() {
    this.recipientsService.getAllUsersMember().subscribe((data: any) => {
      this.memberUsers = data.items;
      this.dataSource = new MatTableDataSource<Recipients>(this.memberUsers);
      this.first = data.links.first;
      this.previous = data.links.previous;
      this.next = data.links.next;
      this.last = data.links.last;
    });
  }

  getBantuan() {
    this.recipientsService.getBantuan().subscribe((data: any) => {
      this.Bantuan = data.data;
      console.table(this.Bantuan);
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

  checkboxLabel(row?: Recipients): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  pagsButton(params: string) {
    this.recipientsService.pagsButton(params);
    return this.getAllUsersMember()
  }

  pagsSearch() {
    this.recipientsService.pagsSearch(this.searchForm.get('search')?.value);
    return this.getAllUsersMember();
  }

  delUsersRegister(ids: any) {
    return this.recipientsService.delUsersMember(ids).subscribe(() => {
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

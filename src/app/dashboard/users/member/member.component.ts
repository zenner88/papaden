import { Component, OnInit } from '@angular/core';
import { Member } from "./member";
import { MemberService } from "./member.service";
import { SelectionModel } from "@angular/cdk/collections";
import { FormBuilder } from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MemberpopupComponent} from "./memberpopup/memberpopup.component";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.sass']
})
export class MemberComponent implements OnInit {

  memberUsers: Member[] = [];
  dataSource: any;
  displayedColumns: string[] = ['select', 'fullname', 'born_city', 'born_date', 'sex_category_title', 'phone', 'email', 'action'];
  selection = new SelectionModel<Member>(true, []);
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
    public memberService: MemberService,
    private formBuilder: FormBuilder,
    public popUpMember: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllUsersMember();
  }

  getAllUsersMember() {
    this.memberService.getAllUsersMember().subscribe((data: any) => {
      this.memberUsers = data.items;
      this.dataSource = new MatTableDataSource<Member>(this.memberUsers);
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

  checkboxLabel(row?: Member): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  pagsButton(params: string) {
    this.memberService.pagsButton(params);
    return this.getAllUsersMember()
  }

  pagsSearch() {
    this.memberService.pagsSearch(this.searchForm.get('search')?.value);
    return this.getAllUsersMember();
  }

  delUsersRegister(ids: any) {
    return this.memberService.delUsersMember(ids).subscribe(() => {
      this.getAllUsersMember();
    });
  }

  popUpMemberUpdate() {
    const popUpRef = this.popUpMember.open(MemberpopupComponent);
    popUpRef.afterClosed().subscribe(() => {
      this.getAllUsersMember();
    })
  }

}

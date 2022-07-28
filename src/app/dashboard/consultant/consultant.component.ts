import { Component, OnInit } from '@angular/core';
import {Consultant} from "./consultant";
import {SelectionModel} from "@angular/cdk/collections";
import {Member} from "../users/member/member";
import {FormBuilder} from "@angular/forms";
import {ConsultantService} from "./consultant.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.sass']
})
export class ConsultantComponent implements OnInit {

  userConsultant: Consultant[] = [];
  dataSource: any;
  displayedColumns: string[] = ['select', 'consultant_id', 'consultant_fullname', 'consultant_specialis', 'consultant_city', 'consultant_exp', 'consultant_phone', 'consultant_profil_url', 'action'];
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
    public consultantService: ConsultantService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getAllConsultant();
  }

  getAllConsultant() {
    this.consultantService.getAllConsultant().subscribe((data: any) => {
      this.userConsultant = data.items;
      this.dataSource = new MatTableDataSource<Consultant>(this.userConsultant);
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

  checkboxLabel(row?: Member): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  pagsButton(params: string) {
    this.consultantService.pagsButton(params);
    return this.getAllConsultant();
  }

  pagsSearch() {
    this.consultantService.pagsSearch(this.searchForm.get('search')?.value);
    return this.getAllConsultant();
  }
}

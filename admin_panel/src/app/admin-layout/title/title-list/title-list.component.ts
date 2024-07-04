import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TitleService } from '@services/title/title.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-title-list',
  templateUrl: './title-list.component.html',
  styleUrls: ['./title-list.component.scss']
})
export class TitleListComponent implements OnInit {
  selectedRow: any = {};
  titleArr: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: any;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.getAll();

  }
  getAll() {
    this.spinner.show();
    let obj: any = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
    };
    this.titleService
      .getAllTitle(obj)
      .subscribe((success) => {
        this.titleArr = success.data;
        this.collection = success.count;
        this.spinner.hide();
      });
  }
  edit(id: any) {
    if (id) {
      this.router.navigate(['title/title-form'], { queryParams: { id } });
    } else {
      this.router.navigate(['title/title-form']);
    }
  }
  create(id: any) {
    if (id) {
      this.router.navigate(['title/title-form'], { queryParams: { id } });
    } else {
      this.router.navigate(['title/title-form']);
    }
  }
  refreshList(title) {
    this.search = title == 'clear' ? '' : this.search;
    this.getAll();
  }

  onChangePage(pageNo) {
    if (pageNo > 0) {
      this.page = pageNo;
    }
    this.getAll();
  }
  open(u, content) {
    this.selectedRow = u;
    this.modalService.open(content, { centered: true });
  }

  delete() {
    this.titleService.deleteTitle(this.selectedRow._id).subscribe(
      (success) => {
        this.selectedRow = {};
        this.getAll();
        this.modalService.dismissAll();
        this.toastService.success(success.message);
      },
      (error) => {
        this.selectedRow = {};
        this.modalService.dismissAll();
      }
    );
  }


}

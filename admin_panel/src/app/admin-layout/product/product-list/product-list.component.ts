import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../services/product/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  selectedRow: any = {};
  users: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: number = 0;
  userDetails: any = {};

  constructor(
    private ProductService: ProductService,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    console.log('0---------');

    this.getAll();
  }
  getAll() {
    console.log('1---------');

    this.spinner.show();
    this.ProductService.getAllUsers({
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
    }).subscribe((success) => {
      this.users = success.data;
      console.log('success---------', this.users);
      this.collection = success.count;
      this.spinner.hide();
    },(err:any)=>{
    console.log('2---------', err);

    });
  }

  create(id: any) {
    if (id) {
      this.router.navigate(['product/product-form'], { queryParams: { id } });
    } else {
      this.router.navigate(['product/product-form']);
    }
  }

  edit(id: any) {
    if (id) {
      this.router.navigate(['product/product-form'], { queryParams: { id } });
    } else {
      this.router.navigate(['product/product-form']);
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

  deleteUser(id) {
    this.ProductService.deleteUser(id).subscribe(
      (success) => {
        this.getAll();
        this.selectedRow = {};
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

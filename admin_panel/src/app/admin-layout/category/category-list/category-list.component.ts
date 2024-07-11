import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import {CategoryService} from '../../../services/category/category.service';
import { StorageService } from 'src/app/core/services/local-storage.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  selectedRow: any = {};
  users: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: number = 0;
  userDetails: any = {};
  storageService: any;


  constructor(
    private CategoryService: CategoryService,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private StorageService: StorageService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    // this.userDetails = this.storageService.get('AIuser');
    this.getAll();


  }
  getAll() {
    this.spinner.show();
    this.CategoryService
      .getAllUsers({
        page: this.page,
        pageSize: this.pageSize,
        search: this.search,
      })
      .subscribe((success) => {
        this.users = success.data;
        // console.log('success---------',success);
        this.collection = success.count;
        this.spinner.hide();
      });

  }

  create(id: any) {
    if (id) {
      this.router.navigate(['category/category-form'], { queryParams: { id } });
    } else {
      this.router.navigate(['category/category-form']);
    }
  }

  edit(id:any){

    if(id){
      this.router.navigate(['category/category-form'], {queryParams:{id}} );

     
    }else{
      this.router.navigate(['category/category-form']);
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

  deleteUser(_id) {
    this.CategoryService.deleteUser(_id).subscribe(
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



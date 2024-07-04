import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/core/services/local-storage.service';
import { UserService } from '../../../services/users/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  selectedRow: any = {};
  users: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: number = 0;
  userDetails: any = {};

  constructor(
    private userService: UserService,
    private router: Router,
    private storageService: StorageService,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.userDetails = this.storageService.get('s2pUser');
    this.getAll();
    
  }

  getAll() {
    this.spinner.show();
    this.userService
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

  edit(id: any) {
    if (id) {
      this.router.navigate(['users/users-form'], { queryParams: { id } });
    } else {
      this.router.navigate(['users/users-form']);
    }
  }
  create(id: any) {
    if (id) {
      this.router.navigate(['users/users-form'], { queryParams: { id } });
    } else {
      this.router.navigate(['users/users-form']);
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
    this.userService.deleteUser(id).subscribe(
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

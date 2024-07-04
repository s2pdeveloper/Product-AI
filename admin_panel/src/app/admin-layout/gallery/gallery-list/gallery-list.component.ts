import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GalleryService } from '@services/gallery/gallery.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.scss']
})
export class GalleryListComponent implements OnInit {
  selectedRow: any = {};
  imageArr: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: any;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private GalleryService: GalleryService
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
    this.GalleryService
      .getGalleryListing(obj)
      .subscribe((success) => {
        this.imageArr = success.data;
        this.collection = success.count;
        this.spinner.hide();
      });
  }
  edit(id: any) {
    if (id) {
      this.router.navigate(['gallery/gallery-form'], { queryParams: { id } });
    } else {
      this.router.navigate(['gallery/gallery-form']);
    }
  }
  create(id: any) {
    if (id) {
      this.router.navigate(['gallery/gallery-form'], { queryParams: { id } });
    } else {
      this.router.navigate(['gallery/gallery-form']);
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
    this.GalleryService.deleteGallery(this.selectedRow._id).subscribe(
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

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { TestimonialService } from '@services/testimonial/testimonial.service';
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-testimonial-list',
  templateUrl: './testimonial-list.component.html',
  styleUrls: ['./testimonial-list.component.scss']
})
export class TestimonialListComponent implements OnInit {
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
    private testimonialService: TestimonialService

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

    this.testimonialService
      .getTestimonialListing(obj)
      .subscribe((success) => {
        this.imageArr = success.data;
        this.collection = success.count;
        this.spinner.hide();
      });
  }
  edit(id: any) {
    if (id) {
      this.router.navigate(['testimonial/Testimonial-form'], { queryParams: { id } });
    } else {
      this.router.navigate(['testimonial/Testimonial-form']);
    }
  }
  create(id: any) {
    if (id) {
      this.router.navigate(['testimonial/Testimonial-form'], { queryParams: { id } });
    } else {
      this.router.navigate(['testimonial/Testimonial-form']);
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
    this.testimonialService.deleteTestimonial(this.selectedRow._id).subscribe(
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

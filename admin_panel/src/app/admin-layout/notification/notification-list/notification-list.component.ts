import {Location} from "@angular/common";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import { NotificationsService} from 'src/app/services/notifications/notification.service'

@Component({
    selector: "app-notification-list",
    templateUrl: "./notification-list.component.html",
    styleUrls: ["./notification-list.component.scss"],
})
export class NotificationListComponent implements OnInit {
  selectedRow: any = {};
  notificationArr: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: any;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private notificationsService: NotificationsService
  ) {}

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
    this.notificationsService
      .getNotificationListing(obj)
      .subscribe((success) => {
        this.notificationArr = success.rows;
        this.collection = success.count;
        this.spinner.hide();
      });
  }

  edit(id: any) {
    if (id) {
      this.router.navigate(['notification/notification-form'], { queryParams: { id } });
    } else {
      this.router.navigate(['notification/notification-form']);
    }
  }
  create(id: any) {
    if (id) {
      this.router.navigate(['notification/notification-form'], { queryParams: { id } });
    } else {
      this.router.navigate(['notification/notification-form']);
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
    this.notificationsService.deleteNotification(this.selectedRow._id).subscribe(
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

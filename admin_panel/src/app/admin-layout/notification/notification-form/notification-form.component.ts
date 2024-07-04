import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../core/components';
import { NotificationsService } from '../../../services/notifications/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: "app-notification-form",
    templateUrl: "./notification-form.component.html",
    styleUrls: ["./notification-form.component.scss"],
})
export class NotificationFormComponent implements OnInit {
    submitted = false;
    fileContent: any;
    images: any;
    choosen: boolean;

  notificationForm = this.formBuilder.group({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });
  params: any;
  // spinner: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private location: Location,
    private notificationsService: NotificationsService,
    private validationService: ValidationService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      if (params.id) {
        this.getById(params.id);
      }
    });
  }
  get form() {
    return this.notificationForm.controls;
  }

  submit() {
    this.submitted = true;
    if (this.notificationForm.invalid) {
      this.toastService.warning('Please fill all required field !');
      return;
    }
    let formData = this.notificationForm.value;
    if (formData.id) {
      this.update(formData);
    } else {
      delete formData.id;
      this.create(formData);
    }
  }
  create(formData) {
    this.spinner.show();
    this.notificationsService.createNotification(formData).subscribe((success) => {
      this.spinner.hide();
      this.toastService.success(success.message);
      this.router.navigate(['notification/notification-list']);
    });
  }
  update(formData) {
    this.spinner.show();
    this.notificationsService.updateNotification(formData.id, formData).subscribe((success) => {
      this.submitted = false;
      this.spinner.hide();
      this.toastService.success(success.message);
      this.router.navigate(['notification/notification-list']);
    });
  }
 
  getById(id) {
    this.notificationsService.getNotificationById(id).subscribe((success) => {
      this.notificationForm.patchValue(success);
    });
  }

goBack(){
  this.location.back()
}
}
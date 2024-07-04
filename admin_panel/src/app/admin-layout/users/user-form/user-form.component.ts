import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../core/components';
import { UserService } from '../../../services/users/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { identifierName } from '@angular/compiler';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  submitted = false;

  userForm = this.formBuilder.group(
    {
      id: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        this.validationService.emailValidator,
      ]),
      mobileNumber: new FormControl('', [Validators.required]),
      password: new FormControl('admin@1234', [Validators.required]),
      confirmPassword: new FormControl('admin@1234', [Validators.required]),
      location: new FormControl(''),
      role: new FormControl(null, [Validators.required]),
    },
    {
      validator: this.validationService.MustMatch(
        'password',
        'confirmPassword'
      ),
    }
  );
  constructor(
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private validationService: ValidationService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      if (params?.id) {
        this.getUserById(params.id);
      }
    });
  }
  get form() {
    return this.userForm.controls;
  }
  submit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      this.toastService.warning('Please fill all required field !');
      return;
    }
    let formData = this.userForm.value;
    if (formData.id) {
      this.update(formData);
    } else {
      delete formData.id;
      this.create(formData);
    }
  }

  create(formData) {
    this.spinner.show();
    this.userService.createUser(formData).subscribe((success) => {
      this.spinner.hide();
      this.toastService.success(success.message);
      this.router.navigate(['users/users']);
    });
  }
  
  update(formData) {
    this.spinner.show();
    this.userService.updateUser(formData.id, formData).subscribe((success) => {
      this.submitted = false;
      this.spinner.hide();
      this.toastService.success(success.message);
      this.router.navigate(['users/users']);
    });
  }

  getUserById(id) {
    this.userService.profile(id).subscribe((success) => {
      this.userForm.patchValue(success);
      console.log('success@@@@@@',success);
      this.userForm.controls.role.disable();
    });
  }

  goBack() {
    this.location.back();
  }
}

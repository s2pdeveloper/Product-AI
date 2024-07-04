import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../core/components';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import{ StudentAchievementService} from '../../../services/studentAchievement/student-achievement.service'
@Component({
  selector: 'app-student-achievement-form',
  templateUrl: './student-achievement-form.component.html',
  styleUrls: ['./student-achievement-form.component.scss']
})
export class StudentAchievementFormComponent implements OnInit {
  submitted = false;

  studentForm = this.formBuilder.group( {
      id: new FormControl(''),
      name: new FormControl('',[Validators.required]),
      achievement: new FormControl('',[Validators.required]),
      email: new FormControl('', [
        Validators.required,
        this.validationService.emailValidator,
      ]),
      mobileNumber: new FormControl('',[Validators.required]),
      address: new FormControl(''),
    },
  );
  
  constructor(
    private spinner: NgxSpinnerService,
    private studentAchievementService: StudentAchievementService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private validationService: ValidationService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      if (params.id) {
        this.getStudentAchieveById(params.id);
      }
    });
  }
  get form() {
    return this.studentForm.controls;
  }
  submit() {
    this.submitted = true;
    if (this.studentForm.invalid) {
      this.toastService.warning('Please fill all required field !');
      return;
    }
    let formData = this.studentForm.value;
    if (formData.id) {
      this.update(formData);
    } else {
      delete formData.id;
      this.create(formData);
    }
  }

  create(formData) {
    console.log('formData-------------',formData);
    this.spinner.show();
    this.studentAchievementService.createStudentAchievement(formData).subscribe((success) => {
      this.spinner.hide();
      console.log('success',success);
      this.toastService.success(success.message);
      this.router.navigate(['studentAchievement/studentAchievement']);
    });
  }

   
  update(formData) {
    this.spinner.show();
    this.studentAchievementService.updateStudentAchievement(formData.id, formData).subscribe((success) => {
      this.submitted = false;
      this.spinner.hide();
      this.toastService.success(success.message);
      this.router.navigate(['studentAchievement/studentAchievement']);
    });
  }

  getStudentAchieveById(id) {
    this.studentAchievementService.getStudentAchievementById(id).subscribe((success) => {
      this.studentForm.patchValue(success);
      console.log('success@@@@@@',success);

    });
  }



  goBack() {
    this.location.back();
  }
}


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
import { NgxSpinnerService } from 'ngx-spinner';
import { identifierName } from '@angular/compiler';
import {CategoryService} from '../../../services/category/category.service';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  

  submitted = false;
  catForm = this.formBuilder.group(
    {
      _id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      description: new FormControl ('', [Validators.required])
    }
  )
  

  

  constructor(
    private spinner: NgxSpinnerService,
    private CategoryService: CategoryService,
    private router: Router,
    private formBuilder: FormBuilder,

    private location: Location,
    private validationService: ValidationService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {

    this.actRoutes.queryParams.subscribe((params)=>{
      if(params?.id){
        this.getUserById(params.id);
      }
    }
  )
 }

  get form() {
    return this.catForm.controls;
  }

  submit(){
    console.log(this.catForm);
    
    this.submitted = true;
    if(this.catForm.invalid){
      this.toastService.warning('Please fill all required fields');
      return;
    }

    let formData = this.catForm.value;
    if(formData._id){
      this.update(formData);
      
    }else{
      delete formData._id;
      this.create(formData);
    }
  }

  create(formData){
    this.spinner.show();
    this.CategoryService.createUser(formData).subscribe((success)=>{
      this.spinner.hide();
      this.toastService.success(success.message);
      this.router.navigate(['category/category-list']);
    }
  )
  }

  update(formData){

    this.spinner.show();
    this.CategoryService.updateUser(formData.id, formData).subscribe((success) => {
      this.submitted = false;
      this.spinner.hide();
      this.toastService.success(success.message);
      this.router.navigate(['category/category']);
    });
    
  }

  getUserById(_id) {
    this.CategoryService.profile(_id).subscribe((success) => {
      this.catForm.patchValue(success);
      console.log('success@@@@@@',success);
      this.catForm.controls.role.disable();
    });
  }

  goBack() {
    this.location.back();
  }

}

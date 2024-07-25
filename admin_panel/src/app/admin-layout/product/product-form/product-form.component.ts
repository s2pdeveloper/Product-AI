import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../core/components';
import { NgxSpinnerService } from 'ngx-spinner';
import { identifierName } from '@angular/compiler';
import { ProductService } from '../../../services/product/product.service';
import { observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  data: string[] = [];
  Keys: any = '';
  KeysString : '';
  userKey: any = '';
  userKeyString : '';
  
  
  // Keys: string[] = [];
  // payload: '';

  submitted = false;
  productForm = this.formBuilder.group({
    _id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
    key: new FormControl([]),
    userKey: new FormControl([Validators.required]),
  });

  constructor(
    private spinner: NgxSpinnerService,
    private ProductService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder,

    private location: Location,
    private validationService: ValidationService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllMasterData();
    // this.createUser();

    this.actRoutes.queryParams.subscribe((params) => {
      if (params?.id) {
        this.getUserById(params.id);
      }
    });
  }

  get form() {
    return this.productForm.controls;
  }

  submit() {
    console.log(this.productForm);
    this.submitted = true;
    if (this.productForm.invalid) {
      this.toastService.warning('Please fill all the required fields');
      return;
    }

    let formData = this.productForm.value;
    formData.key = this.Keys.split(',');
    formData.userKey = this.userKey.split(',')

   console.log(formData)
    
    if (formData._id) {
      this.update(formData);
    } else {
      delete formData._id;
      this.create(formData);
    }


    
  }

  create(formData) {
    this.spinner.show();
    this.ProductService.createUser(formData).subscribe((success) => {
      this.spinner.hide();
      this.toastService.success(success.message);
      this.router.navigate(['product/product-list']);
    });
  }

  update(formData) {
    this.spinner.show();
    this.ProductService.updateUser(formData._id, formData).subscribe(
      (success) => {
        this.submitted = false;
        this.spinner.hide();
        this.toastService.success(success.message);
        this.router.navigate(['product/product-list']);
      }
    );
  }

  getUserById(id: any) {
    this.ProductService.profile(id).subscribe((success) => {
      this.Keys = success.data.key.join(',');
      this.productForm.patchValue(success.data);
      console.log('success@@@@@@', success);
    });
  }

  getAllMasterData() {
    this.ProductService.getAllMasterData().subscribe((success) => {
      this.data = success.data;
      console.log('success@@@@@@', success.data);
    });
  }

  // createUser(){
  //   this.ProductService.createUser(observable).subscribe((success)=>{
  //     this.Keys = success.Keys;
  //     console.log('success@@@@@@', success.Keys)
  //   });
  // }

  goBack() {
    this.location.back();
  }
}

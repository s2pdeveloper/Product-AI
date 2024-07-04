import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../core/components';
import { HomeService } from '../../../services/home/home.service'
@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.scss']
})
export class HomeFormComponent implements OnInit {
  submitted = false;
  fileContent: any;
  images: any;
  choosen: boolean;
  image: any;

  homeForm = this.formBuilder.group({
    id: new FormControl(''),
    floatingText: new FormControl(''),
    // title: new FormControl(''),
    // subTitle: new FormControl(''),
    // text: new FormControl(''),
    // description: new FormControl(''),
    // carouselImage: new FormControl(),
  });
 
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private validationService: ValidationService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService,
    private HomeService: HomeService
  ) { }

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
        this.getById();
    });
  }

  get form() {
    return this.homeForm.controls;
  }
  submit() {
    this.submitted = true;
    if (this.homeForm.invalid) {
      this.toastService.warning('Please fill all required field !');
      return;
    }
    let formData = this.homeForm.value;
    if (formData.id) {
      this.update(formData);
    } else {
      delete formData.id;
      this.create(formData);
    }
  }
  create(formData) {
    // const fd = new FormData();
    // if (this.images) {
    //   fd.append('key', 'Home');
    //   fd.append('carouselImage', this.images, this.images.name);
    //   fd.append('floatingText', formData.floatingText);
    //   fd.append('title', formData.title);
    //   fd.append('subTitle', formData.subTitle);
    //   fd.append('text', formData.text);
    //   fd.append('description', formData.description);
      this.HomeService.createHome(formData).subscribe((success) => {
        this.submitted = false;
        this.toastService.success(success.message);
      });
    // } else {
    //   this.toastService.warning('Please upload Home');
    // }
  }
  getById() {
    this.HomeService.getHomeById().subscribe((success) => {
      this.homeForm.patchValue(success);
      this.image = success.carouselImage;
    });
  }
  update(formData) {
    // const fd = new FormData();
    // if (this.images) {
    //   fd.append('key', 'Home');
    //   fd.append('carouselImage', this.images, this.images.name);
    // }
    // fd.append('id', formData.id);
    // fd.append('floatingText', formData.floatingText);
    // fd.append('title', formData.title);
    // fd.append('subTitle', formData.subTitle);
    // fd.append('text', formData.text);
    //   fd.append('description', formData.description);
    this.HomeService
      .updateHome(formData.id, formData)
      .subscribe((success) => {
        this.submitted = false;
        this.toastService.success(success.message);
         this.getById();
      });
  }
  // fileChoosen(event: any) {
  //   if (event.target.value) {
  //     if (event.target.files[0].size > 2000000) {
  //       this.toastService.warning(
  //         'Unable to upload image of size more than 2MB'
  //       );
  //       return;
  //     }
  //     this.images = <File>event.target.files[0];
  //     const reader = new FileReader();
  //     reader.readAsDataURL(this.images);
  //     reader.onload = () => {
  //       this.fileContent = reader.result;
  //     };
  //     reader.onerror = (error) => { };
  //     this.choosen = true;
  //   }
  // }
  goBack() {
    this.location.back()
  }
}

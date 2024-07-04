import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../core/components';
import{ AboutUsService} from '../../../services/aboutUs/about-us.service'

@Component({
  selector: 'app-about-us-form',
  templateUrl: './about-us-form.component.html',
  styleUrls: ['./about-us-form.component.scss']
})
export class AboutUsFormComponent implements OnInit {
    submitted = false;
    fileContent: any;
    images: any;
    choosen: boolean;
    image: any;

  aboutUsForm = this.formBuilder.group({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    whoAreWE: new FormControl(''),
    whatWeDo: new FormControl(''),
    whyUs: new FormControl(''),
    image: new FormControl(),
  });
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private validationService: ValidationService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService,
    private aboutUsService:AboutUsService
  ) { }

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      this.getById();
     });
  }
  get form() {
    return this.aboutUsForm.controls;
  }
  submit() {
    this.submitted = true;
    if (this.aboutUsForm.invalid) {
      this.toastService.warning('Please fill all required field !');
      return;
    }
    let formData = this.aboutUsForm.value;
    if (formData.id) {
      this.update(formData);
    } else {
      delete formData.id;
      this.create(formData);
    }
  }
  create(formData) {
    const fd = new FormData();
    if (this.images) {
      fd.append('key', 'aboutUs');
      fd.append('image', this.images, this.images.name);
      fd.append('description', formData.description);
      fd.append('whoAreWE', formData.whoAreWE);
      fd.append('whatWeDo', formData.whatWeDo);
      fd.append('whyUs', formData.whyUs);
      fd.append('title', formData.title);
      this.aboutUsService.createAboutUs(fd).subscribe((success) => {
        this.submitted = false;
        this.toastService.success(success.message);
      });
    } else {
      this.toastService.warning('Please upload AboutUs');
    }
  }
  getById() {
    this.aboutUsService.getAboutUsById().subscribe((success) => {
      this.aboutUsForm.patchValue(success);
      this.image = success.image;
    });
  }
  update(formData) {
    const fd = new FormData();
    if (this.images) {
      fd.append('key', 'aboutUs');
      fd.append('image', this.images, this.images.name);
    }
    fd.append('id', formData.id);
    fd.append('description', formData.description);
    fd.append('whoAreWE', formData.whoAreWE);
    fd.append('whatWeDo', formData.whatWeDo);
    fd.append('whyUs', formData.whyUs);
    fd.append('title', formData.title);
    this.aboutUsService
      .updateAboutUs(formData.id, fd)
      .subscribe((success) => {
        this.submitted = false;
        this.toastService.success(success.message);
        this.getById();
      });
  }
  fileChoosen(event: any) {
    if (event.target.value) {
      if (event.target.files[0].size > 2000000) {
        this.toastService.warning(
          'Unable to upload image of size more than 2MB'
        );
        return;
      }
      this.images = <File>event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.images);
      reader.onload = () => {
        this.fileContent = reader.result;
      };
      reader.onerror = (error) => {};
      this.choosen = true;
    }
}
goBack(){
  this.location.back()
}
}

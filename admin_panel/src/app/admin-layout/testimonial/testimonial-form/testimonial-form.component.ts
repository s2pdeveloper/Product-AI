import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../core/components';
import { TestimonialService} from 'src/app/services/testimonial/testimonial.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-testimonial-form',
  templateUrl: './testimonial-form.component.html',
  styleUrls: ['./testimonial-form.component.scss']
})
export class TestimonialFormComponent implements OnInit {
  submitted = false;
  fileContent: any;
  images: any;
  choosen: boolean;

  testimonialForm = this.formBuilder.group({
    id: new FormControl(''),
    quote: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    bioData: new FormControl('', [Validators.required]),
    image: new FormControl(),
  });
  fileContentImage: any;
  image: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private spinner: NgxSpinnerService,
    private validationService: ValidationService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService,
    private testimonialService: TestimonialService
  ) { }

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      if (params.id) {
        this.getById(params.id);
      }
    });
  }

  get form() {
    return this.testimonialForm.controls;
  }
  submit() {
    this.submitted = true;
    if (this.testimonialForm.invalid) {
      this.toastService.warning('Please fill all required field !');
      return;
    }
    let formData = this.testimonialForm.value;
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
      fd.append('key', 'testimonial');
      fd.append('image', this.images, this.images.name);
      fd.append('quote', formData.quote);
      fd.append('name', formData.name);
      fd.append('bioData', formData.bioData);
      this.testimonialService.createTestimonial(fd).subscribe((success) => {
        this.submitted = false;
        this.toastService.success(success.message);
        this.router.navigate(['/testimonial/Testimonial-list']);
      });
    } else {
      this.toastService.warning('Please upload Home');
    }
  }
  update(formData) {
    const fd = new FormData();
    if (this.images) {
      fd.append('key', 'testimonial');
      fd.append('image', this.images, this.images.name);
    }
    fd.append('id', formData.id);
    fd.append('quote', formData.quote);
    fd.append('name', formData.name);
    fd.append('bioData', formData.bioData);
    this.testimonialService
      .updateTestimonial(formData.id, fd)
      .subscribe((success) => {
        this.submitted = false;
        this.toastService.success(success.message);
        this.router.navigate(['/testimonial/Testimonial-list']);
      });
  }
  getById(id) {
    this.testimonialService.getTestimonialById(id).subscribe((success) => {
      this.testimonialForm.patchValue(success);
      this.image = success.image;
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

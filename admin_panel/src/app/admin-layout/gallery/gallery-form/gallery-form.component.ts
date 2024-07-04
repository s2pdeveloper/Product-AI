import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../core/components';
import { GalleryService} from 'src/app/services/gallery/gallery.service'
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-gallery-form',
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.scss']
})
export class GalleryFormComponent implements OnInit {
  submitted = false;
  fileContent: any;
  images: any;
  choosen: boolean;

  galleryForm = this.formBuilder.group({
    id: new FormControl(''),
    // title: new FormControl('', [Validators.required]),
    carouselImage: new FormControl(),
  });
  image: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private spinner: NgxSpinnerService,
    private validationService: ValidationService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService,
    private galleryService: GalleryService
  ) { }
  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      if (params.id) {
        this.getById(params.id);
      }
    });
  }
  get form() {
    return this.galleryForm.controls;
  }
  submit() {
    this.submitted = true;
    if (this.galleryForm.invalid) {
      this.toastService.warning('Please fill all required field !');
      return;
    }
    let formData = this.galleryForm.value;
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
      fd.append('key', 'gallery');
      fd.append('carouselImage', this.images, this.images.name);
      fd.append('title', formData.title);
      this.galleryService.createGallery(fd).subscribe((success) => {
        this.submitted = false;
        this.toastService.success(success.message);
        this.router.navigate(['/gallery/gallery-list']);
      });
    } else {
      this.toastService.warning('Please upload Home');
    }
  }
  update(formData) {
    const fd = new FormData();
    if (this.images) {
      fd.append('key', 'gallery');
      fd.append('carouselImage', this.images, this.images.name);
    }
    fd.append('title', formData.title);
    this.galleryService
      .updateGallery(formData.id, fd)
      .subscribe((success) => {
        this.submitted = false;
        this.toastService.success(success.message);
        this.router.navigate(['/gallery/gallery-list']);
      });
  }
  getById(id) {
    this.galleryService.getGalleryById(id).subscribe((success) => {
      this.galleryForm.patchValue(success);
      this.image = success.carouselImage;
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

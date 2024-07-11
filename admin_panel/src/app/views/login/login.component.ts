import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';
import { ImageService } from '../../services/images/image.service';
import { ValidationService } from '../../core/components';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  loginForm: FormGroup;
  loading = false;

  myInterval: number | 0 = 6000;
  slides: any[] = [];
  activeSlideIndex: number = 0;
  noWrapSlides: boolean = false;
  fieldTextType: boolean;

  imageArr: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private imageService: ImageService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastService: ToastrService,
    private validationService: ValidationService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.getCourseListing();
    this.createForm();
    localStorage.removeItem('AIuser');
    // get return url from route parameters or default to "/"
    this.returnUrl =
      this.route.snapshot.queryParams[`returnUrl`] || '/dashboard';
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        this.validationService.emailValidator,
      ]),
      password: ['', Validators.required],
    });
  }

  login() {
    this.spinner.show();
    this.authService.login(this.loginForm.value).subscribe((success) => {
      console.log(success);     
      if (typeof window !== 'undefined') {
        localStorage.setItem('AIuser', JSON.stringify(success));
  

      }
      // this.toastService.success('Login done Successfully!');
      this.router.navigate(['./dashboard']);
      // this.router.navigateByUrl(this.returnUrl);
      this.spinner.hide();
    });
  }
  getCourseListing() {
    this.spinner.show();
    let obj: any = {
      page: 1,
      pageSize: 20,
      search: '',
      flag: 'Slider',
    };

    this.imageService.getImageListing(obj).subscribe((success) => {
      this.slides = success.rows;
      if (this.slides.length == 0) {
        for (let i = 0; i < 4; i++) {
          this.addSlide();
        }
      }
      this.spinner.hide();
    });
  }
  ngOnDestroy(): void {
    this.myInterval = 0;
    this.noWrapSlides = true;
    this.myInterval = 0;
  }

  addSlide(): void {
    setTimeout(() => {
      const seed = Math.random().toString(36).slice(-6);
      this.slides.push({
        image: `https://picsum.photos/seed/${seed}/900/500`,
      });
    }, 500);
  }

  removeSlide(index?: number): void {
    const toRemove = index ? index : this.activeSlideIndex;
    this.slides.splice(toRemove, 1);
  }
}

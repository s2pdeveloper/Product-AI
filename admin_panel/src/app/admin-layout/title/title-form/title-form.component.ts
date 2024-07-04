import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder,FormControl, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from 'src/app/core/components';
import { TitleService} from 'src/app/services/title/title.service'

@Component({
  selector: 'app-title-form',
  templateUrl: './title-form.component.html',
  styleUrls: ['./title-form.component.scss']
})
export class TitleFormComponent implements OnInit {
  back:any
    submitted = false;
    fileContent: any;
    choosen: boolean;

  titleForm = this.formBuilder.group({
    id: new FormControl(''),
    heading: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private location: Location,
    private validationService: ValidationService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService,
    private titleService:TitleService
    ) { }

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      if (params.id) {
        this.getById(params.id);
      }
    });
  }

  get form() {
    return this.titleForm.controls;
  }

  submit() {
    this.submitted = true;
    if (this.titleForm.invalid) {
      this.toastService.warning('Please fill all required field !');
      return;
    }
    let formData = this.titleForm.value;
    if (formData.id) {
      this.update(formData);
    } else {
      delete formData.id;
      this.create(formData);
    }
  }
  create(formData) {
    this.spinner.show();
    this.titleService.createTitle(formData).subscribe((success) => {
      this.spinner.hide();
      this.toastService.success(success.message);
      this.router.navigate(['title/title']);
    });
  }
  update(formData) {
    this.spinner.show();
    this.titleService.updateTitle(formData.id, formData).subscribe((success) => {
      this.submitted = false;
      this.spinner.hide();
      this.toastService.success(success.message);
      this.router.navigate(['title/title']);
    });
  }

  getById(id) {
    this.titleService.getTitleById(id).subscribe((success) => {
      this.titleForm.patchValue(success);
      this.fileContent = success.image;
    });
  }

  goBack(){
    this.location.back()
  }
}

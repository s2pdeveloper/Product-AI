import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialFormComponent } from './testimonial-form/testimonial-form.component';
import { TestimonialListComponent } from './testimonial-list/testimonial-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TestimonialRoutingModule } from './testimonial-routing.module'


@NgModule({
  declarations: [
    TestimonialFormComponent,
    TestimonialListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TestimonialRoutingModule,
    ReactiveFormsModule,
    CoreModule.forRoot(),
    NgbModule,
    NgxSpinnerModule,
  ]
})
export class TestimonialModule { }

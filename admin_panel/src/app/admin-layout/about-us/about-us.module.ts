import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsFormComponent } from './about-us-form/about-us-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AboutUsRoutingModule } from './aboutUs-routing.module';



@NgModule({
  declarations: [
    AboutUsFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AboutUsRoutingModule,
    ReactiveFormsModule,
    CoreModule.forRoot(),
    NgbModule,
    NgxSpinnerModule,
  ]
})
export class AboutUsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeFormComponent } from './home-form/home-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeRoutingModule } from './home-routing.module'


@NgModule({
  declarations: [
    HomeFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    CoreModule.forRoot(),
    NgbModule,
    NgxSpinnerModule,
  ]
})
export class HomeModule { }

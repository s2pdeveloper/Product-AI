import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleFormComponent } from './title-form/title-form.component';
import { TitleListComponent } from './title-list/title-list.component';
import { TitleRoutingModule } from './title-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    TitleFormComponent,
    TitleListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TitleRoutingModule,
    ReactiveFormsModule,
    CoreModule.forRoot(),
    NgbModule,
    NgxSpinnerModule,

  ]
})
export class TitleModule { }

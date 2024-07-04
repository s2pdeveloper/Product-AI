import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryFormComponent } from './gallery-form/gallery-form.component';
import { GalleryListComponent } from './gallery-list/gallery-list.component';
import { GalleryRoutingModule } from './gallery-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    GalleryFormComponent,
    GalleryListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GalleryRoutingModule,
    ReactiveFormsModule,
    CoreModule.forRoot(),
    NgbModule,
    NgxSpinnerModule,
  ]
})
export class GalleryModule { }

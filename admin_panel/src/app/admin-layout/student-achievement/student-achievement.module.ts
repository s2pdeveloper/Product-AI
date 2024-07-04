import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentAchievementFormComponent } from './student-achievement-form/student-achievement-form.component';
import { StudentAchievementListComponent } from './student-achievement-list/student-achievement-list.component';
import { StudentAchievementRoutingModule } from './student-achievement-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    StudentAchievementFormComponent,
    StudentAchievementListComponent
  ],
  imports: [
    CommonModule,
    StudentAchievementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule.forRoot(),
    NgbModule,
    NgxSpinnerModule,


  ]
})
export class StudentAchievementModule { }

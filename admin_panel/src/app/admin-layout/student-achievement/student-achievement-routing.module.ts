import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentAchievementListComponent } from './student-achievement-list/student-achievement-list.component';
import { StudentAchievementFormComponent } from './student-achievement-form/student-achievement-form.component';

const userRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'StudentAchievement',
    },
    children: [
      {
        path: '',
        redirectTo: 'studentAchievement',
      },
      {
        path: 'studentAchievement',
        component: StudentAchievementListComponent,
        data: {
          title: 'StudentAchievement List',
        },
      },
      {
        path: 'studentAchievement-form',
        component: StudentAchievementFormComponent,
        data: {
          title: 'StudentAchievement Form',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class StudentAchievementRoutingModule {}

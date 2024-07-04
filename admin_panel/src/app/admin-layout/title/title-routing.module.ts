import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TitleListComponent } from './title-list/title-list.component';
import { TitleFormComponent } from './title-form/title-form.component';

const userRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Title',
    },
    children: [
      {
        path: '',
        redirectTo: 'title',
      },
      {
        path: 'title',
        component: TitleListComponent,
        data: {
          title: 'Title List',
        },
      },
      {
        path: 'title-form',
        component: TitleFormComponent,
        data: {
          title: 'Title Form',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class TitleRoutingModule {}

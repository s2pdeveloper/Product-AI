import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeFormComponent } from './home-form/home-form.component';

const userRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Home',
    },
    children: [
      {
        path: '',
        redirectTo: 'home',
      },
      {
        path: 'home-form',
        component: HomeFormComponent,
        data: {
          title: 'home-Form',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsFormComponent } from './about-us-form/about-us-form.component';

const userRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'AboutUs',
    },
    children: [
      {
        path: '',
        redirectTo: 'aboutUs',
      },
      {
        path: 'aboutUs-form',
        component: AboutUsFormComponent,
        data: {
          title: 'aboutUs-Form',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class AboutUsRoutingModule {}

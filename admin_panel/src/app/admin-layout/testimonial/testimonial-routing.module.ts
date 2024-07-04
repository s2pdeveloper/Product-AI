import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestimonialFormComponent } from './testimonial-form/testimonial-form.component';
import { TestimonialListComponent } from './testimonial-list/testimonial-list.component';


const userRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Testimonial',
    },
    children: [
      {
        path: '',
        redirectTo: 'Testimonial-list',
      },
      {
        path: 'Testimonial-list',
        component: TestimonialListComponent,
        data: {
          title: 'Testimonial-list',
        },
      },
      {
        path: 'Testimonial-form',
        component: TestimonialFormComponent,
        data: {
          title: 'Testimonial-Form',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class TestimonialRoutingModule {}

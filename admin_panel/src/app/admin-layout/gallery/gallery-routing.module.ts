import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryFormComponent } from './gallery-form/gallery-form.component';
import { GalleryListComponent } from './gallery-list/gallery-list.component';

const userRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Gallery',
    },
    children: [
      {
        path: '',
        redirectTo: 'gallery-list',
      },
      {
        path: 'gallery-list',
        component: GalleryListComponent,
        data: {
          title: 'gallery-list',
        },
      },
      {
        path: 'gallery-form',
        component: GalleryFormComponent,
        data: {
          title: 'gallery-Form',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class GalleryRoutingModule {}

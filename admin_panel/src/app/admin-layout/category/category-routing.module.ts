import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';





const categoryRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Category',
    },
    children: [
      {
        path: '',
        redirectTo: 'category',
      },
      {
        path: 'category-form',
        component: CategoryFormComponent,
        data: {
          title: 'Category Form',
        },
      },
      {
        path: 'category-list',
        component: CategoryListComponent,
        data: {
          title: 'Category List',
        },
      },
    ],
  },
];
  



@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(categoryRoutes)
    
  ],
  exports: [RouterModule],

})
export class CategoryRoutingModule { }

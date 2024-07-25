import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';





const productRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Product',
    },
    children: [
      {
        path: '',
        redirectTo: 'Product',
      },
      {
        path: 'product-form',
        component: ProductFormComponent,
        data: {
          title: 'Product Form',
        },
      },
      {
        path: 'product-list',
        component: ProductListComponent,
        data: {
          title: 'Product List',
        },
      },
    ],
  },
];
  



@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(productRoutes)
    
  ],
  exports: [RouterModule],

})
export class ProductRoutingModule { }

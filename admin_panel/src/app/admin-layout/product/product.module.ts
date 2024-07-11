import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CoreModule } from '../../core/core.module';
import { ProductRoutingModule } from './product-routing.module';



@NgModule({
  declarations: [
    ProductFormComponent,
    ProductListComponent],
  imports: [ProductRoutingModule, CoreModule.forRoot()],
})
export class ProductModule {}

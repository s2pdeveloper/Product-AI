import { NgModule } from '@angular/core';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CoreModule } from '../../core/core.module';
import { CategoryRoutingModule } from './category-routing.module';





@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryFormComponent],
  imports: [CategoryRoutingModule, CoreModule.forRoot()],
})
export class CategoryModule {}

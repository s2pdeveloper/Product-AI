import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationFormComponent } from './notification-form/notification-form.component';
import { NotificationRoutingModule } from './notification-routing.module';

@NgModule({
  declarations: [NotificationFormComponent, NotificationListComponent],
  imports: [NotificationRoutingModule, CoreModule.forRoot()],
})
export class NotificationModule {}

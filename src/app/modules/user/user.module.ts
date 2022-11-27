import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { UserRoutingModule } from './user.routing';

@NgModule({
  declarations: [HomeComponent, ListComponent],
  imports: [UserRoutingModule, SharedModule],
  providers: [],
  exports: [],
})
export class UserModule {}

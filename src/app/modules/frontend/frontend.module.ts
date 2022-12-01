import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { FrontendRoutingModule } from './frontend.routing';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [HomeComponent, ListComponent, CardComponent],
  imports: [FrontendRoutingModule, SharedModule],
  providers: [],
  exports: [],
})
export class FrontendModule {}

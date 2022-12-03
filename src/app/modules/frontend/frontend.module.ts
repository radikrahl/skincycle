import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { FrontendRoutingModule } from './frontend.routing';
import { CardComponent } from './components/card/card.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    CardComponent,
    CalendarComponent,
  ],
  imports: [FrontendRoutingModule, SharedModule],
  providers: [],
  exports: [],
})
export class FrontendModule {}

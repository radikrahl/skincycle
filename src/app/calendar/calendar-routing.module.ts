import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CalendarComponent } from './pages/calendar/calendar.component';

const routes: Route[] = [{ path: '', component: CalendarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule {}

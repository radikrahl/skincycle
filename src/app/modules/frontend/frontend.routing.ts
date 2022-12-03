import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'list',
    component: ListComponent,
    data: { title: 'Produktliste', actionIconClass: 'sc-icon-add' },
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    data: { title: 'Kalender', actionIconClass: 'sc-icon-moon' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrontendRoutingModule {
  constructor() {}
}

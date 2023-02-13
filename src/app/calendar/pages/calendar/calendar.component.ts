import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CalendarViewModel } from '../../models/calendar.model';
import { Store } from '@ngxs/store';
import { DateService } from 'src/app/shared/services/date.service';

import { CalendarViewQueries } from '../../selectors/calendar-view.queries';
import { SetCalendarModel, SetVisibleDays } from '../../state/actions';
import { FrontendBaseComponent } from 'src/app/core/components/base.component';
import {
  SetHeader,
  SetHeaderIcon,
  SetSubtitle,
} from 'src/app/layout/header/state/actions';
import { HeaderOptions } from 'src/app/layout/header/models/options.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'sc-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [DateService],
})
export class CalendarComponent
  extends FrontendBaseComponent
  implements OnDestroy, OnInit
{
  public isToday = true;
  public isEvening;
  public themeClass: string;
  public headerOptions: HeaderOptions;

  public viewModel$: Observable<CalendarViewModel>;

  constructor(
    protected override renderer: Renderer2,
    protected override store: Store,
    private moment: DateService
  ) {
    super(store, renderer);

    this.isEvening = this.moment.isEvening();
    this.themeClass = this.isEvening ? 'theme-blue' : 'theme-orange';
    const iconClass = this.isEvening ? 'sc-icon-moon' : 'sc-icon-sun';
    this.headerOptions = new HeaderOptions(
      'Kalender',
      iconClass,
      this.headerCallback.bind(this),
      this.moment.currentMonth()
    );

    this.viewModel$ = this.store.select(CalendarViewQueries.getViewModel2);
    this.store.dispatch(new SetVisibleDays(new Date()));
  }

  headerCallback() {
    this.renderer.removeClass(document.body, this.themeClass);
    this.isEvening = !this.isEvening;
    this.themeClass = this.isEvening ? 'theme-blue' : 'theme-orange';
    const iconClass = this.isEvening ? 'sc-icon-moon' : 'sc-icon-sun';
    this.renderer.addClass(document.body, this.themeClass);

    this.store.dispatch(new SetHeaderIcon(iconClass));
    this.store.dispatch(new SetCalendarModel(this.isEvening));
  }

  selectDay(event: MouseEvent, date: Date) {
    this.store.dispatch(new SetVisibleDays(date));

    this.store.dispatch(new SetSubtitle(this.moment.currentMonth(date)));

    if (this.moment.compareDays(date, new Date()) !== 0)
      this.isToday = false;

    this.clear();
  }

  apply() {
    this.viewModel$ = this.store.select(CalendarViewQueries.getViewModel);
  }

  clear() {
    this.viewModel$ = this.store.select(CalendarViewQueries.getViewModel2);
  }

  setToday() {
    this.store.dispatch(new SetVisibleDays(new Date()));
    this.isToday = true;
  }
}

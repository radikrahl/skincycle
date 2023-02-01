import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';

import {
  HeaderOptions,
  HeaderTitleService,
} from 'src/app/shared/services/header-title.service';
import { CalendarViewModel } from '../../models/calendar.model';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DateService } from 'src/app/shared/services/date.service';

import { CalendarViewQueries } from '../../queries/calendar-view.queries';
import { SetCalendarModel, SetVisibleDays } from '../../state/actions';
import { FrontendBaseComponent } from 'src/app/home/base.component';

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
  public isEvening;
  public themeClass: string;
  public headerOptions: HeaderOptions;

  public viewModel$!: Observable<CalendarViewModel>;

  constructor(
    protected override renderer: Renderer2,
    private titleService: HeaderTitleService,
    private moment: DateService,

    private store: Store
  ) {
    super(titleService, renderer);

    this.isEvening = moment.isEvening();
    this.themeClass = this.isEvening ? 'theme-blue' : 'theme-orange';
    const iconClass = this.isEvening ? 'sc-icon-moon' : 'sc-icon-sun';
    this.headerOptions = new HeaderOptions(
      'Kalender',
      iconClass,
      this.headerCallback.bind(this)
    );
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.viewModel$ = this.store.select(CalendarViewQueries.getViewModel);
  }

  headerCallback() {
    this.renderer.removeClass(document.body, this.themeClass);
    this.isEvening = !this.isEvening;
    this.themeClass = this.isEvening ? 'theme-blue' : 'theme-orange';
    const iconClass = this.isEvening ? 'sc-icon-moon' : 'sc-icon-sun';

    this.titleService.setHeaderOptions(
      new HeaderOptions('Kalender', iconClass, this.headerCallback.bind(this))
    );
    this.renderer.addClass(document.body, this.themeClass);

    this.store.dispatch(new SetCalendarModel(this.isEvening));
  }

  selectDay(event: MouseEvent, date: Date) {
    this.store.dispatch(new SetVisibleDays(date));
  }

  apply() {}

  clear() {}
}

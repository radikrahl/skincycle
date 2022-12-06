import { Component, OnDestroy, Renderer2 } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Routine } from 'src/app/models/routine.model';
import { CsvRoutinesService } from 'src/app/services/csv/csv.routines.service';
import {
  HeaderOptions,
  HeaderTitleService,
} from 'src/app/shared/services/header-title.service';
import { MomentService } from 'src/app/shared/services/moment.service';
import { FrontendBaseComponent } from '../base.component';

@Component({
  selector: 'sc-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent
  extends FrontendBaseComponent
  implements OnDestroy
{
  public themeClass = 'theme-blue';
  public headerOptions: HeaderOptions = new HeaderOptions(
    'Kalender',
    'sc-icon-moon'
  );

  public routines: Routine[] = [];

  constructor(
    renderer: Renderer2,
    titleService: HeaderTitleService,
    moment: MomentService,
    service: CsvRoutinesService
  ) {
    super(titleService, renderer);

    console.log(moment.customCalendar);

    service.getAll().subscribe({
      next: (routines) => (this.routines = routines),
    });
  }

  public calendar: {
    visibleDays: Array<{ name: string; label: string; day: number }>;
  } = {
    visibleDays: [
      {
        name: 'Monday',
        label: 'MO',
        day: 1,
      },
      {
        name: 'Tuesday',
        label: 'DI',
        day: 2,
      },
      {
        name: 'Wednesday',
        label: 'MI',
        day: 2,
      },
    ],
  };
}

import { Component, OnDestroy, Renderer2 } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import {
  HeaderOptions,
  HeaderTitleService,
} from 'src/app/services/header-title.service';
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
  protected override headerOptions: HeaderOptions = new HeaderOptions(
    'Kalender',
    'sc-icon-moon'
  );
  constructor(private renderer: Renderer2, titleService: HeaderTitleService) {
    super(titleService, new HeaderOptions('Kalender', 'sc-icon-moon'));
    this.renderer.addClass(document.body, 'theme-blue');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'theme-blue');
  }

  public routine: Routine = {
    base: 'NIA',
    steps: [
      {
        category: 'Cleanser',
        products: [
          {
            name: 'Name',
            ingredients: [],
            isAvailable: false,
            price: 0,
            usages: [],
            skinStatus: [],
          },
        ],
      },
      {
        category: 'Peeling/Maske',
        products: [
          {
            name: 'Name',
            ingredients: [],
            isAvailable: false,
            price: 0,
            usages: [],
            skinStatus: [],
          },
        ],
      },
    ],
  };

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

class Routine {
  public base: string = '';

  public steps: Array<{ category: string; products: Product[] }> = [];
}

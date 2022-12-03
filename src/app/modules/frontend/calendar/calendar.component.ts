import { Component, OnDestroy, Renderer2 } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'sc-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnDestroy {
  constructor(private renderer: Renderer2) {
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

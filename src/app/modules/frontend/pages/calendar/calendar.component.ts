import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { IngredientRelations } from 'src/app/ingredients/models/ingredient-relations.model';
import { Product } from 'src/app/products/models/product.model';
import { Routine } from 'src/app/models/routine.model';

import {
  HeaderOptions,
  HeaderTitleService,
} from 'src/app/shared/services/header-title.service';
import { FrontendBaseComponent } from '../../base.component';
import { CalendarModel, VisibleDay } from './calendar.model';
import { Select, Store } from '@ngxs/store';
import { IngredientsState } from 'src/app/ingredients/ingredients.state';
import { Observable } from 'rxjs';
import { ProductsState } from 'src/app/products/state/products.state';
import { DateService } from 'src/app/shared/services/date.service';
import { ProductsQueries } from 'src/app/products/queries/products.queries';

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

  public routine$: Observable<Routine | undefined> = new Observable();
  public calendar: CalendarModel;
  public steps: {
    category: Category;
    products: Product[];
    relations?: IngredientRelations;
  }[] = [];
  selectedStep:
    | {
        category: Category;
        products: Product[];
        isOpen: boolean;
      }
    | undefined;
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

    const visibleDays = this.moment
      .getVisibleDays(new Date())
      .map((x) => new VisibleDay(x));

    this.calendar = new CalendarModel(visibleDays);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.routine$ = this.store.select(
      IngredientsState.getRoutine(
        this.isEvening,
        this.calendar.visibleDays[1].date //get selected day
      )
    );

    this.store.select(ProductsQueries.getProductsForCategories).subscribe((x) => {
      this.steps.push(...x);
    });
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
  }

  selectDay(event: MouseEvent, date: Date) {
    this.calendar.visibleDays = this.moment
      .getVisibleDays(date)
      .map((x) => new VisibleDay(x));
  }

  apply() {}

  clear() {}
}

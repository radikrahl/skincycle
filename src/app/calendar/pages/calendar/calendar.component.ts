import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Routine } from 'src/app/models/routine.model';

import {
  HeaderOptions,
  HeaderTitleService,
} from 'src/app/shared/services/header-title.service';
import { FrontendBaseComponent } from '../../../modules/frontend/base.component';
import {
  CalendarModel,
  CalendarStepModel,
  VisibleDay,
} from '../../models/calendar.model';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DateService } from 'src/app/shared/services/date.service';
import { ProductsQueries } from 'src/app/products/queries/products.queries';
import { RoutineQueries } from '../../queries/routine.queries';
import { IngredientQueries } from '../../queries/ingredient.queries';
import { CategoriesState } from 'src/app/products/state/categories.state';

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

  public routine?: Routine;

  public calendar: CalendarModel;

  public steps: CalendarStepModel[] = [];

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
      RoutineQueries.getRoutine(
        this.isEvening,
        this.calendar.visibleDays[1].date //get selected day
      )
    );

    this.routine$.subscribe((routine) => (this.routine = routine));

    this.store
      .select(ProductsQueries.getProductsForCategories)
      .subscribe((steps) => {
        this.steps = steps;
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

    this.routine = this.store.selectSnapshot(
      RoutineQueries.getRoutine(
        this.isEvening,
        this.calendar.visibleDays[1].date //get selected day
      )
    );
  }

  apply() {
    if (this.routine) {
      const ingredients = this.store.selectSnapshot(
        IngredientQueries.getRelationByLabel(this.routine?.base)
      );

      if (ingredients) {
        const products = this.store.selectSnapshot(
          ProductsQueries.getProductsForIngredients(ingredients)
        );
        this.steps = this.store.selectSnapshot(
          CategoriesState.getStepModel(products)
        );
      }
    }
  }

  clear() {
    this.steps = this.store.selectSnapshot(
      ProductsQueries.getProductsForCategories
    );
  }
}

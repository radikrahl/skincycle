import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { Routine } from 'src/app/models/routine.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { CsvCategoriesService } from 'src/app/services/csv/csv.categories.service';
import { CsvIngredientRelationsService } from 'src/app/services/csv/csv.ingredient-relations.service';
import { CsvProductsService } from 'src/app/services/csv/csv.products.service';
import { CsvRoutinesService } from 'src/app/services/csv/csv.routines.service';
import { IngredientRelationsService } from 'src/app/services/ingredient-relations.service';
import { ProductsService } from 'src/app/services/products.service';
import { RoutineService } from 'src/app/services/routines.service';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import {
  HeaderOptions,
  HeaderTitleService,
} from 'src/app/shared/services/header-title.service';
import { FrontendBaseComponent } from '../../base.component';

export class VisibleDay {
  public name: string;
  public label: string;

  public day: number;
  public date: Date;
  constructor(date: Date) {
    const locale = 'de-De';
    this.date = date;
    this.name = date.toLocaleDateString(locale, { weekday: 'long' });
    this.label = date
      .toLocaleDateString(locale, { weekday: 'short' })
      .toLocaleUpperCase();
    this.day = date.getDate();
  }
}

export class CalendarModel {
  public visibleDays: VisibleDay[];
  public today: Date;

  constructor(visibleDays: VisibleDay[]) {
    this.visibleDays = visibleDays;
    this.today = new Date();
  }
}

@Component({
  selector: 'sc-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [CalendarService],
})
export class CalendarComponent
  extends FrontendBaseComponent
  implements OnDestroy, OnInit
{
  public isEvening;
  public themeClass: string;
  public headerOptions: HeaderOptions;

  public routine?: Routine;
  public calendar: CalendarModel;
  public steps: {
    category: Category;
    products: Product[];
    isOpen: boolean;
  }[] = [];
  selectedStep: {
    category: Category;
    products: Product[];
    isOpen: boolean;
  } | undefined;
  constructor(
    protected override renderer: Renderer2,
    private titleService: HeaderTitleService,
    private moment: CalendarService,
    private routinesService: CsvRoutinesService,
    private ingredientRelationsService: CsvIngredientRelationsService,
    private productsService: CsvProductsService,
    private categoriesService: CsvCategoriesService
  ) {
    super(titleService, renderer);

    this.isEvening = moment.isEvening();
    this.themeClass = this.isEvening ? 'theme-blue' : 'theme-orange';
    const iconClass = this.isEvening ? 'sc-icon-moon' : 'sc-icon-sun';
    this.headerOptions = new HeaderOptions('Kalender', iconClass);

    const visibleDays = this.moment
      .getVisibleDays(new Date())
      .map((x) => new VisibleDay(x));

    this.calendar = new CalendarModel(visibleDays);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.titleService.onClick.subscribe((x) => {
      this.renderer.removeClass(document.body, this.themeClass);
      this.isEvening = !this.isEvening;
      this.themeClass = this.isEvening ? 'theme-blue' : 'theme-orange';
      const iconClass = this.isEvening ? 'sc-icon-moon' : 'sc-icon-sun';

      this.titleService.setHeaderOptions(
        new HeaderOptions('Kalender', iconClass)
      );
      this.renderer.addClass(document.body, this.themeClass);

      this.updateView();
    });

    this.updateView();
  }

  selectDay(event: MouseEvent, date: Date) {
    this.calendar.visibleDays = this.moment
      .getVisibleDays(date)
      .map((x) => new VisibleDay(x));
    this.updateView();
  }

  apply() {
    this.updateView({ byRelation: true });
  }

  clear() {
    this.updateView();
  }

  private updateView(
    filter: { byRelation: boolean } = { byRelation: false }
  ): void {
    this.routinesService
      .getRoutine(this.isEvening, this.calendar.visibleDays[1].date)
      .subscribe({
        next: (routine) => {
          this.routine = routine;

          forkJoin([
            this.categoriesService.getAll(),
            this.productsService.getAll(),
            this.ingredientRelationsService.getByLabel(routine?.base),
          ]).subscribe({
            next: (values) => {
              const categories = values[0];
              let products = values[1];
              const relations = values[2];

              this.steps = [];

              for (let index = 0; index < categories.length; index++) {
                const category = categories[index];
                products = this.productsService.getProductsByCategory(
                  values[1],
                  category.name
                );

                if (relations && filter.byRelation) {
                  products = this.productsService.getProductsForWirkstoff(
                    products,
                    relations
                  );
                }

                if (products.length > 0) {
                  this.steps.push({
                    category: category,
                    products: products,
                    isOpen: false,
                  });
                }
              }
            },
          });
        },
      });
  }
}

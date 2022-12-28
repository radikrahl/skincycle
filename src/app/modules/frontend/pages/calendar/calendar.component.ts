import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
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
import {
  CalendarService,
  VisisibleDay,
} from 'src/app/shared/services/calendar.service';
import {
  HeaderOptions,
  HeaderTitleService,
} from 'src/app/shared/services/header-title.service';
import { FrontendBaseComponent } from '../../base.component';

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

  public routines?: Routine = new Routine();

  public steps: {
    category: Category;
    products: Product[];
    isOpen: boolean;
  }[] = [];

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
    this.headerOptions = new HeaderOptions('Kalender', iconClass, [
      this.themeClass,
    ]);
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

    this.calendar.visibleDays = this.moment
      .getVisibleDays(new Date())
      .map((x) => new VisisibleDay(x));

    this.updateView();
  }

  updateView(): void {
    this.routinesService
      .getRoutine(this.isEvening, this.calendar.visibleDays[1].date)
      .subscribe({
        next: (routine) => {
          this.routines = routine;

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

                if (relations) {
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

  public toggleCard(
    event: MouseEvent,
    step: {
      category: Category;
      products: Product[];
      isOpen: boolean;
    }
  ) {
    if (!step.isOpen) this.steps.forEach((step) => (step.isOpen = false));

    step.isOpen = !step.isOpen;
    const productslistElement: HTMLElement | null = <HTMLElement>(
      (event.target as HTMLElement).nextElementSibling?.firstElementChild
    );
    const categorylistHeader: HTMLElement | null = event.target as HTMLElement;
    const accordion: HTMLElement | null = categorylistHeader.parentElement;
    const accordionItems: HTMLElement | null = <HTMLElement>(
      accordion?.lastElementChild
    );

    if (productslistElement && accordionItems)
      accordionItems.style.height = step.isOpen
        ? productslistElement.offsetHeight + 'px'
        : 0 + 'px';
  }

  selectDay(event: MouseEvent, date: Date) {
    this.calendar.visibleDays = this.moment
      .getVisibleDays(date)
      .map((x) => new VisisibleDay(x));
    this.updateView();
  }
  public calendar: {
    visibleDays: VisisibleDay[];
  } = { visibleDays: [] };
}

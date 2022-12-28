import { Component, OnDestroy, Renderer2 } from '@angular/core';
import { map, tap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CsvRoutine } from 'src/app/models/csv/csv.routines.model';
import { Product } from 'src/app/models/product.model';
import { Routine } from 'src/app/models/routine.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { CsvCategoriesService } from 'src/app/services/csv/csv.categories.service';
import { CsvProductsService } from 'src/app/services/csv/csv.products.service';
import { CsvRoutinesService } from 'src/app/services/csv/csv.routines.service';
import {
  CsvIngredientRelationsService,
  IngredientRelationsService,
} from 'src/app/services/ingredient-relations.service';
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
  implements OnDestroy
{
  public isEvening = true;
  public themeClass = this.isEvening ? 'theme-blue' : 'theme-orange';
  public iconClass = this.isEvening ? 'sc-icon-moon' : 'sc-icon-sun';
  public headerOptions: HeaderOptions = new HeaderOptions(
    'Kalender',
    this.iconClass,
    [this.isEvening]
  );

  public routines?: Routine = new Routine();

  public steps: {
    category: Category;
    products: Product[];
    isOpen: boolean;
  }[] = [];

  constructor(
    renderer: Renderer2,
    titleService: HeaderTitleService,
    moment: CalendarService,
    routinesService: CsvRoutinesService,
    ingredientRelationsService: CsvIngredientRelationsService,
    productsService: CsvProductsService,
    categoriesService: CsvCategoriesService
  ) {
    super(titleService, renderer);

    this.calendar.visibleDays = moment.getVisibleDays();
    titleService.onChange.subscribe(
      (x) => (this.isEvening = x.iconClass == 'sc-icon-moon')
    );

    titleService.onClick.subscribe((x) => {
      this.isEvening = !this.isEvening;
      this.themeClass = this.isEvening ? 'theme-blue' : 'theme-orange';
      this.iconClass = this.isEvening ? 'sc-icon-moon' : 'sc-icon-sun';
      titleService.setHeaderOptions(this.headerOptions);
    });

    categoriesService.getAll().subscribe({
      next: (categories) => {
        categories.forEach((category) => {
          productsService
            .getProductsByCategory(category.label)
            .subscribe((products) => {
              if (products.length > 0) {
                this.steps.push({
                  category: category,
                  products: products,
                  isOpen: false,
                });
              }
            });
        });
      },
    });

    // routinesService.getRoutine(this.isEvening).subscribe({
    //   next: (routine) => {
    //     // if (routine == undefined || routine.base == undefined) {
    //     //   return;
    //     // } else {
    //     //   this.routines = routine;
    //     //   return ingredientRelationsService.getByLabel(routine.base).subscribe({
    //     //     next: (relation) => {

    //     //     },
    //     //   });
    //     // }
    //   },
    // });
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

  public calendar: {
    visibleDays: VisisibleDay[];
  } = { visibleDays: [] };
}

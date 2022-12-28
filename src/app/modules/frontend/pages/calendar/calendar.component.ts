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

    routinesService.getRoutine(this.isEvening).subscribe({
      next: (routine) => {
        if (routine == undefined || routine.base == undefined) {
          return;
        } else {
          this.routines = routine;
          return ingredientRelationsService.getByLabel(routine.base).subscribe({
            next: (relation) => {
              categoriesService.getAll().subscribe({
                next: (categories) => {
                  categories.forEach((category) => {
                    productsService
                      .getProductsForWirkstoff(category.label, relation)
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
            },
          });
        }
      },
    });
  }

  public toggleCard(step: {
    category: Category;
    products: Product[];
    isOpen: boolean;
  }) {
    if (!step.isOpen) this.steps.forEach((x) => (x.isOpen = false));

    step.isOpen = !step.isOpen;
  }

  public calendar: {
    visibleDays: VisisibleDay[];
  } = { visibleDays: [] };
}

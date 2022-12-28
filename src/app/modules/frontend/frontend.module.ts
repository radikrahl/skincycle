import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListComponent } from './pages/list/list.component';
import { FrontendRoutingModule } from './frontend.routing';
import { CardComponent } from './components/card/card.component';
import { HomeComponent } from './pages/home/home.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { CategoriesService } from 'src/app/services/categories.service';
import { CsvCategoriesService } from 'src/app/services/csv/csv.categories.service';
import { CsvProductsService } from 'src/app/services/csv/csv.products.service';
import { CsvRoutinesService } from 'src/app/services/csv/csv.routines.service';
import {
  CsvIngredientRelationsService,
  IngredientRelationsService,
} from 'src/app/services/ingredient-relations.service';
import { ProductsService } from 'src/app/services/products.service';
import { ApiService } from 'src/app/services/api.service';
import { RoutineService } from 'src/app/services/routines.service';

@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    CardComponent,
    CalendarComponent,
  ],
  imports: [FrontendRoutingModule, SharedModule],
  providers: [
    { provide: CsvProductsService, useClass: CsvProductsService },
    { provide: CsvCategoriesService, useClass: CsvCategoriesService },
    { provide: CsvRoutinesService, useClass: CsvRoutinesService },
    {
      provide: CsvIngredientRelationsService,
      useClass: CsvIngredientRelationsService,
    },
  ],
  exports: [],
})
export class FrontendModule {}

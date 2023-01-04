import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListComponent } from './pages/list/list.component';
import { FrontendRoutingModule } from './frontend.routing';
import { CardComponent } from './components/card/card.component';
import { HomeComponent } from './pages/home/home.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { CsvCategoriesService } from 'src/app/services/csv/csv.categories.service';
import { CsvProductsService } from 'src/app/services/csv/csv.products.service';
import { CsvRoutinesService } from 'src/app/services/csv/csv.routines.service';
import { CsvIngredientRelationsService } from 'src/app/services/csv/csv.ingredient-relations.service';
import { AccordionModule } from 'src/app/shared/components/accordion/accordion.module';

@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    CardComponent,
    CalendarComponent,
  ],
  imports: [FrontendRoutingModule, SharedModule, AccordionModule],
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

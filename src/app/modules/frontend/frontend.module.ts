import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListComponent } from './pages/list/list.component';
import { FrontendRoutingModule } from './frontend.routing';
import { CardComponent } from './components/card/card.component';
import { HomeComponent } from './pages/home/home.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ProductsService } from 'src/app/services/products.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { CsvCategoriesService } from 'src/app/services/csv/csv.categories.service';
import { CsvProductsService } from 'src/app/services/csv/csv.products.service';

@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    CardComponent,
    CalendarComponent,
  ],
  imports: [FrontendRoutingModule, SharedModule],
  providers: [
    { provide: ProductsService, useClass: CsvProductsService },
    { provide: CategoriesService, useClass: CsvCategoriesService },
  ],
  exports: [],
})
export class FrontendModule {}

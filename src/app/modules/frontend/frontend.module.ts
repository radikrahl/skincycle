import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FrontendRoutingModule } from './frontend.routing';
import { HomeComponent } from './pages/home/home.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { AccordionModule } from 'src/app/shared/components/accordion/accordion.module';
import { ProductsModule } from 'src/app/products/products.module';
import { ListComponent } from '../../products/pages/list/list.component';
import { IngredientsModule } from 'src/app/ingredients/ingredients.module';

@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    CalendarComponent,
  ],
  imports: [FrontendRoutingModule, SharedModule, AccordionModule, ProductsModule, IngredientsModule],
  providers: [
  ],
  exports: [],
})
export class FrontendModule {}

import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ProductsModule } from '../products/products.module';
import { ApiDataService } from '../shared/services/apidata.service';
import { DateService } from '../shared/services/date.service';
import { SharedModule } from '../shared/shared.module';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { CalendarState } from './state/calendar.state';
import { RoutinesState } from '../shared/routines/state/routines.state';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { IngredientsState } from '../ingredients/state/ingredients.state';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CalendarRoutingModule,
    IngredientsModule,
    ProductsModule,
    SharedModule,
    NgxsModule.forFeature([RoutinesState,IngredientsState, CalendarState]),
  ],
  exports: [],
  providers: [ApiDataService, DateService],
})
export class CalendarModule {}

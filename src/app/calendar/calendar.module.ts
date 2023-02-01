import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ApiDataService } from '../shared/services/apidata.service';
import { DateService } from '../shared/services/date.service';
import { SharedModule } from '../shared/shared.module';
import { CalendarState } from './state/calendar.state';
import { IngredientsState } from './state/ingredients.state';
import { RoutinesState } from './state/routines.state';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    NgxsModule.forFeature([IngredientsState, RoutinesState, CalendarState]),
  ],
  exports: [],
  providers: [ApiDataService, DateService],
})
export class CalendarModule {}

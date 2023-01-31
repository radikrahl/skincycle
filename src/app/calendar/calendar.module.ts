import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ApiDataService } from '../shared/services/apidata.service';
import { SharedModule } from '../shared/shared.module';
import { IngredientsState } from './state/ingredients.state';
import { RoutinesState } from './state/routines.state';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    NgxsModule.forFeature([IngredientsState, RoutinesState]),
  ],
  exports: [],
  providers: [ApiDataService],
})
export class CalendarModule {}

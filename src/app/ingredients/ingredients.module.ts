import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientsState } from '../calendar/state/ingredients.state';
import { NgxsModule } from '@ngxs/store';
import { ApiDataService } from '../shared/services/apidata.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, NgxsModule.forFeature([IngredientsState])
  ],
  providers: [ApiDataService]
})
export class IngredientsModule { }

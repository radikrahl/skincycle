import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { IngredientsState } from './state/ingredients.state';
import { ApiDataService } from '../shared/services/apidata.service';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { IngredientCardComponent } from './components/card/card.component';

const routes: Route[] = [{ path: '', component: IngredientsComponent }];

@NgModule({
  declarations: [
    IngredientsComponent,
    IngredientCardComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([IngredientsState]),
  ],
  exports: [],
  providers: [ApiDataService],
})
export class IngredientsModule {}

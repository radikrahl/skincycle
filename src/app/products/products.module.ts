import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ProductsState } from './state/products.state';
import { ApiDataService } from '../shared/services/apidata.service';
import { CardComponent } from './components/card/card.component';
import { CategoriesState } from './state/categories.state';
import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ListComponent } from './pages/list/list.component';

@NgModule({
  declarations: [ListComponent, CardComponent],
  imports: [
    ProductsRoutingModule,
    SharedModule,
    NgxsModule.forFeature([ProductsState, CategoriesState]),
  ],
  exports: [CardComponent],
  providers: [ApiDataService],
})
export class ProductsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { ProductsState } from './state/products.state';
import { ApiDataService } from '../shared/services/apidata.service';
import { CardComponent } from './components/card/card.component';
import { CategoriesState } from './state/categories.state';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, NgxsModule.forFeature([ProductsState, CategoriesState])],
  exports: [CardComponent],
  providers: [ApiDataService]
})
export class ProductsModule {}

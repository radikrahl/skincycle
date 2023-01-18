import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './views/card/card.component';
import { NgxsModule } from '@ngxs/store';
import { ProductsState } from './products.state';
import { DataService } from '../shared/services/data.service';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, NgxsModule.forFeature([ProductsState])],
  exports: [CardComponent],
  providers: [DataService]
})
export class ProductsModule {}

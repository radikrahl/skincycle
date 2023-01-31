import { Injectable } from '@angular/core';
import {
  State,
  Selector,
  Action,
  StateContext,
  NgxsOnInit,
} from '@ngxs/store';
import { Product } from '../models/product.model';
import { ApiDataService } from '../../shared/services/apidata.service';
import { GetProducts } from './actions';
import { tap } from 'rxjs';

export interface ProductsStateModel {
  products: Product[];
}

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    products: [],
  },
})
@Injectable()
export class ProductsState implements NgxsOnInit {
  constructor(private dataService: ApiDataService) {}
  ngxsOnInit(ctx: StateContext<ProductsStateModel>): void {
    ctx.dispatch(new GetProducts());
  }
  @Selector()
  static products(state: ProductsStateModel): ProductsStateModel {
    return state;
  }

  @Action(GetProducts)
  getAll(ctx: StateContext<ProductsStateModel>) {
    if (ctx.getState().products.length > 0) {
      return;
    }

    return this.dataService.getAll('/api/products').pipe(
      tap((values) => {
        const products = values as Product[];
        products.map((product) => {
          product.price = Number.parseFloat(
            product.price as string
          ).toLocaleString('de-DE', {
            style: 'currency',
            currency: 'EUR',
          });
        });

        ctx.setState({ products: products });
      })
    );
  }
}

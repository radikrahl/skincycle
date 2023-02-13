import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext, NgxsOnInit } from '@ngxs/store';
import { Product } from '../models/product.model';
import { ApiDataService } from '../../shared/services/apidata.service';
import { GetProducts } from './actions';
import { share, tap } from 'rxjs';
import {
  EntitiesState,
  EntitiesStateModel,
} from 'src/app/core/state/entities.state';

export type ProductsStateModel = EntitiesStateModel<Product>;

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    entities: [],
  },
})
@Injectable()
export class ProductsState extends EntitiesState implements NgxsOnInit {
  constructor(private dataService: ApiDataService<Product>) {
    super();
  }
  ngxsOnInit(ctx: StateContext<ProductsStateModel>): void {
    ctx.dispatch(new GetProducts());
  }
  @Selector()
  static products(state: ProductsStateModel): ProductsStateModel {
    return state;
  }

  @Action(GetProducts)
  getAll(ctx: StateContext<ProductsStateModel>) {
    if (ctx.getState().entities.length > 0) {
      return;
    }

    return this.dataService.getAll('/api/products').pipe(
      share(),
      tap((products) => {
        products.map((product) => {
          product.price = Number.parseFloat(
            product.price as string
          ).toLocaleString('de-DE', {
            style: 'currency',
            currency: 'EUR',
          });
        });

        ctx.setState({ entities: products });
      })
    );
  }
}

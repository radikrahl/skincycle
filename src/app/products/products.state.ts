import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { forkJoin, tap } from 'rxjs';
import { Product } from './models/product.model';
import { GetAll, GetProductsForIngredients } from './products.actions';
import { Category } from '../models/category.model';
import { DataService } from '../shared/services/data.service';

export interface ProductsStateModel {
  products: Product[];
  categories: Category[];
}

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    products: [],
    categories: [],
  },
})
@Injectable()
export class ProductsState {
  constructor(private dataService: DataService) {}

  @Selector()
  static getProducts(state: ProductsStateModel): Product[] {
    return state.products;
  }

  @Selector()
  static getCategories(state: ProductsStateModel): Category[] {
    return state.categories;
  }

  @Action(GetAll)
  getAll(ctx: StateContext<ProductsStateModel>) {
    if (ctx.getState().products && ctx.getState().categories) {
      return;
    }

    return forkJoin([
      this.dataService.getAll('/api/products'),
      this.dataService.getAll('/api/categories'),
    ]).pipe(
      tap((values) => {
        const products = values[0] as Product[];
        const categories = values[1] as Category[];

        products.map((product) => {
          product.price = Number.parseFloat(
            product.price as string
          ).toLocaleString('de-DE', {
            style: 'currency',
            currency: 'EUR',
          });
        });

        ctx.setState({ categories: categories, products: products });
      })
    );
  }

  @Action(GetProductsForIngredients)
  getProductsForIngredients(
    ctx: StateContext<ProductsStateModel>,
    action: GetProductsForIngredients
  ) {
    const state = ctx.getState();
    return state.products.filter((product) => {
      if (product.category !== action.categoryName) return;

      return product.ingredients.some((r) =>
        action.relations.ingredients.some((tN) => tN.name === r)
      );
    });
  }
}

import { Injectable } from '@angular/core';
import {
  State,
  Selector,
  Action,
  StateContext,
  createSelector,
  NgxsOnInit,
} from '@ngxs/store';
import { forkJoin, tap } from 'rxjs';
import { Product } from './models/product.model';
import { GetAll } from './products.actions';
import { Category } from '../models/category.model';
import { DataService } from '../shared/services/data.service';
import { IngredientRelations } from '../ingredients/models/ingredient-relations.model';

export interface ProductsStateModel {
  products: Product[];
  categories: Category[];
}

@State<ProductsStateModel>({
  name: 'productsState',
  defaults: {
    products: [],
    categories: [],
  },
})
@Injectable()
export class ProductsState implements NgxsOnInit {
  constructor(private dataService: DataService) {}
  ngxsOnInit(ctx: StateContext<ProductsStateModel>): void {
    ctx.dispatch(new GetAll());
  }

  @Selector()
  static getProducts(state: ProductsStateModel): Product[] {
    return state.products;
  }

  @Selector()
  static getProductsByCategory(categoryName: string) {
    return createSelector(
      [ProductsState],
      (state: { productsState: ProductsStateModel }) => {
        return state.productsState.products.filter(
          (x) => x.category === categoryName
        );
      }
    );
  }

  @Selector()
  static getCategories(state: ProductsStateModel): Category[] {
    return state.categories;
  }

  @Action(GetAll)
  getAll(ctx: StateContext<ProductsStateModel>) {
    // if (ctx.getState().products && ctx.getState().categories) {
    //   return;
    // }

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

  @Selector()
  static getProductsForIngredients(relations: IngredientRelations) {
    return createSelector([ProductsState], (state: ProductsStateModel) => {
      return state.products.filter((product) => {
        return product.ingredients.some((r) =>
          relations.ingredients.some((tN) => tN.name === r)
        );
      });
    });
  }

  @Selector()
  static getProductsForCategories(
    state: ProductsStateModel
  ): { category: Category; products: Product[] }[] {
    return state.categories.map((category) => {
      return {
        category: category,
        products: state.products.filter(
          (product) => product.category === category.label
        ),
      };
    });
  }
}

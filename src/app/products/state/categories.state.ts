import { Injectable } from '@angular/core';
import {
  Action,
  createSelector,
  NgxsOnInit,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import { Category } from 'src/app/products/models/category.model';
import { ApiDataService } from 'src/app/shared/services/apidata.service';
import { Product } from '../models/product.model';
import { GetCategories } from './actions';

export type CategoryMap = {
  [categoryName: string]: Product[] | null;
};

export interface CategoryStateModel {
  categories: Category[];
}

@State<CategoryStateModel>({
  name: 'categories',
  defaults: {
    categories: [],
  },
})
@Injectable()
export class CategoriesState implements NgxsOnInit {
  @Selector()
  static categories(state: CategoryStateModel) {
    return state.categories;
  }

  // @Selector()
  // static getCategories(state: CategoryStateModel) {
  //   return state.categories.map(x => x[x.name])
  // }

  constructor(private dataService: ApiDataService) {}
  ngxsOnInit(ctx: StateContext<CategoryStateModel>): void {
    ctx.dispatch(new GetCategories());
  }

  static getStepModel(products: Product[]) {
    return createSelector(
      [CategoriesState.categories],
      (categories: Category[]) => {
        return categories.map((category) => {
          return {
            category: category,
            products: products.filter(
              (product) => product.category === category.label
            ),
          };
        });
      }
    );
  }

  @Action(GetCategories)
  protected getAll(ctx: StateContext<CategoryStateModel>) {
    return this.dataService.getAll('/api/categories').subscribe((values) => {
      const categories = values as Category[];

      ctx.setState({ categories: categories });
    });
  }
}

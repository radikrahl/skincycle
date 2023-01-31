import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { ApiDataService } from 'src/app/shared/services/apidata.service';
import { Product } from '../models/product.model';
import { GetCategories } from './actions';

type CategoryMap = {
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
    console.log(state);
    return state.categories;
  }

  /**
   *
   */
  constructor(private dataService: ApiDataService) {}
  ngxsOnInit(ctx: StateContext<CategoryStateModel>): void {
    ctx.dispatch(new GetCategories());
  }
  @Action(GetCategories)
  getAll(ctx: StateContext<CategoryStateModel>) {
    return this.dataService.getAll('/api/categories').pipe(
      tap((values) => {
        const categories = values as Category[];

        ctx.setState({categories: categories});
      })
    );
  }
}

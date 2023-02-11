import { Injectable } from '@angular/core';
import {
  Action,
  NgxsOnInit,
  State,
  StateContext,
} from '@ngxs/store';
import {
  EntitiesState,
  EntitiesStateModel,
} from 'src/app/core/state/entities.state';
import { Category } from 'src/app/shared/categories/models/category.model';
import { ApiDataService } from 'src/app/shared/services/apidata.service';
import { GetCategories } from './actions';

export type CategoryStateModel = EntitiesStateModel<Category>;

@State<CategoryStateModel>({
  name: 'categories',
  defaults: {
    entities: [],
  },
})
@Injectable()
export class CategoriesState extends EntitiesState implements NgxsOnInit {
  constructor(private dataService: ApiDataService<Category>) {
    super();
  }
  ngxsOnInit(ctx: StateContext<CategoryStateModel>): void {
    ctx.dispatch(new GetCategories());
  }

  @Action(GetCategories)
  protected getAll(ctx: StateContext<CategoryStateModel>) {
    if(ctx.getState().entities.length > 0) {
      return;
    }

    return this.dataService
      .getAll('/api/categories')
      .subscribe((categories) => {
        ctx.setState({ entities: categories });
      });
  }
}

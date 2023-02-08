import { Injectable } from '@angular/core';
import { State, NgxsOnInit, StateContext, Action } from '@ngxs/store';
import { shareReplay } from 'rxjs';
import {
  EntitiesState,
  EntitiesStateModel,
} from 'src/app/core/state/entities.state';
import { Routine } from 'src/app/shared/routines/models/routine.model';
import { ApiDataService } from 'src/app/shared/services/apidata.service';
import { GetRoutines } from './actions';

export type RoutinesStateModel = EntitiesStateModel<Routine>;

@State<RoutinesStateModel>({
  name: 'routines',
  defaults: {
    entities: [],
  },
})
@Injectable()
export class RoutinesState extends EntitiesState implements NgxsOnInit {
  constructor(private dataService: ApiDataService<Routine>) {
    super();
  }

  ngxsOnInit(ctx: StateContext<RoutinesStateModel>): void {
    ctx.dispatch(new GetRoutines());
  }

  @Action(GetRoutines)
  getAll(ctx: StateContext<RoutinesStateModel>) {
    if (ctx.getState().entities.length > 0) {
      return;
    }

    return this.dataService
      .getAll('/api/routines')
      .pipe(shareReplay(1))
      .subscribe((routines) => {
        ctx.setState({ entities: routines });
      });
  }
}

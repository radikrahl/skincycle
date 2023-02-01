import { Injectable } from '@angular/core';
import { State, NgxsOnInit, StateContext, Action, Selector } from '@ngxs/store';
import { Routine } from 'src/app/calendar/models/routine.model';
import { ApiDataService } from 'src/app/shared/services/apidata.service';
import { GetRoutines } from './actions';

export interface RoutinesStateModel {
  routines: Routine[];
}

@State<RoutinesStateModel>({
  name: 'routines',
  defaults: {
    routines: [],
  },
})
@Injectable()
export class RoutinesState implements NgxsOnInit {
  @Selector()
  static routines(state: RoutinesStateModel): RoutinesStateModel {
    return state;
  }

  @Selector()
  static getRoutines(state: RoutinesStateModel): Routine[] {
    return state.routines;
  }

  constructor(private dataService: ApiDataService) {}

  ngxsOnInit(ctx: StateContext<any>): void {
    ctx.dispatch(new GetRoutines());
  }

  @Action(GetRoutines)
  getAll(ctx: StateContext<RoutinesStateModel>) {
    if (ctx.getState().routines.length > 0) {
      return;
    }

    return this.dataService.getAll('/api/routines').subscribe((values) => {
      const routines = values as Routine[];
      ctx.setState({ routines });
    });
  }
}

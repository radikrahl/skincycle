import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, State, StateContext, Store } from '@ngxs/store';
import { Product } from 'src/app/products/models/product.model';
import { Routine } from 'src/app/shared/routines/models/routine.model';
import { RoutinesState } from 'src/app/shared/routines/state/routines.state';
import { DateService } from 'src/app/shared/services/date.service';
import { CalendarStepModel, VisibleDay } from '../models/calendar.model';
import { IngredientRelations } from '../models/ingredient-relations.model';
import { SetCalendarModel, SetVisibleDays } from './actions';

export interface CalendarStateModel {
  routine?: Routine;
  visibleDays: VisibleDay[];
  isEvening: boolean;
  steps: CalendarStepModel[];
}

@State<CalendarStateModel>({
  name: 'calendar',
  defaults: {
    visibleDays: [],
    steps: [],
    isEvening: false,
  },
})
@Injectable()
export class CalendarState implements NgxsOnInit {
  constructor(private dateService: DateService, private store: Store) {}

  ngxsOnInit(ctx: StateContext<CalendarStateModel>): void {
    ctx.patchState({
      isEvening: this.dateService.isEvening(),
      visibleDays: this.getVisibleDates(),
    });
  }

  @Action(SetVisibleDays)
  setDates(ctx: StateContext<CalendarStateModel>, payload: SetVisibleDays) {
    this.store
      .select(RoutinesState.entities<Routine>())
      .subscribe((routines) => {
        const state = ctx.getState();
        const routine = this.extractRoutine(
          routines,
          state.isEvening,
          payload.date
        );

        ctx.patchState({
          routine: routine,
          visibleDays: this.getVisibleDates(payload.date),
        });
      });
  }

  @Action(SetCalendarModel)
  setModel(ctx: StateContext<CalendarStateModel>, payload: SetCalendarModel) {
    ctx.patchState(payload);
  }

  private getVisibleDates(date: Date = new Date()): VisibleDay[] {
    return this.dateService.getVisibleDays(date).map((x) => new VisibleDay(x));
  }

  private extractRoutine(routines: Routine[], isEvening: boolean, date: Date) {
    return routines?.find((routine) => {
      return (
        routine.day === date.toLocaleDateString('de-DE', { weekday: 'long' }) &&
        (isEvening ? routine.daytime == 'abends' : routine.daytime == 'morgens')
      );
    });
  }

  private extractProduct(products: Product[], relations: IngredientRelations) {
    return products.filter((product) => {
      return product.ingredients.some((r) =>
        relations?.ingredients.some((tN) => tN === r)
      );
    });
  }
}

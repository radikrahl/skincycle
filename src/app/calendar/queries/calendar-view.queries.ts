import { Selector } from '@ngxs/store';
import { Routine } from 'src/app/calendar/models/routine.model';
import { ProductsQueries } from 'src/app/products/queries/products.queries';
import { CalendarDays, CalendarStepModel } from '../models/calendar.model';
import { CalendarState, CalendarStateModel } from '../state/calendar.state';
import { RoutinesState } from '../state/routines.state';

export class CalendarViewQueries {
  @Selector([
    CalendarState,
    RoutinesState.getRoutines,
    ProductsQueries.getProductsForCategories,
  ])
  static getViewModel(
    state: CalendarStateModel,
    routines: Routine[],
    steps: CalendarStepModel[]
  ) {
    const today = state.visibleDays[1];
    const routine = CalendarViewQueries.extractRoutine(
      routines,
      state.isEvening,
      today.date
    );
    console.log(routines, routine);
    return {
      days: new CalendarDays(state.visibleDays),
      steps,
      routine,
    };
  }

  private static extractRoutine(
    routines: Routine[],
    isEvening: boolean,
    date: Date
  ) {
    return routines?.find((routine) => {
      return (
        routine.day === date.toLocaleDateString('de-DE', { weekday: 'long' }) &&
        (isEvening ? routine.daytime == 'abends' : routine.daytime == 'morgens')
      );
    });
  }
}

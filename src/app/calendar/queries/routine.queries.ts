import { createSelector } from "@ngxs/store";
import { RoutinesState, RoutinesStateModel } from "../state/routines.state";

export class RoutineQueries {
  static getRoutine(isEvening: boolean, date: Date) {
    return createSelector(
      [RoutinesState.routines],
      (state: RoutinesStateModel) => {
        return state.routines?.find((routine) => {
          return (
            routine.day ===
              date.toLocaleDateString('de-DE', { weekday: 'long' }) &&
            (isEvening
              ? routine.daytime == 'abends'
              : routine.daytime == 'morgens')
          );
        });
      }
    );
  }
}

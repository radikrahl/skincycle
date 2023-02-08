import { createSelector, Selector } from "@ngxs/store";
import { RoutinesState, RoutinesStateModel } from "../state/routines.state";

export class RoutineSelectors {

  static getRoutine(isEvening: boolean, date: Date) {
    return createSelector(
      [RoutinesState.entities()],
      (state: RoutinesStateModel) => {
        return state.entities?.find((routine) => {
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

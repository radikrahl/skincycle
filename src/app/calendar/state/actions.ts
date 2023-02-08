import { Routine } from 'src/app/shared/routines/models/routine.model';

export class GetIngredients {
  static readonly type = '[Ingredients] Get all products';
}
export class SetVisibleDays {
  static readonly type = '[Calendar] Sets the visible dates.';

  constructor(public date: Date) {}
}

export class SetCalendarModel {
  static readonly type = '[Calendar] Sets the calendar model.';

  constructor(public isEvening?: boolean) {}
}

export class SetRoutine {
  static readonly type = '[Calendar] Sets the routine model.';
  constructor(public routine?: Routine) {}
}
export class SetCalendarSteps {
  static readonly type = '[Calendar] sets the current category product map';
}

export class ApplyIngredientFilteredView {
  static readonly type = '[Calendar] apply IngredientFilter';
}

export class ClearFilter {
  static readonly type = '[Calendar] clears all filter';
}

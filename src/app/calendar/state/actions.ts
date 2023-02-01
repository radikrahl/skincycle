export class GetIngredients {
  static readonly type = '[Ingredients] Get all products';
}

export class GetRoutines {
  static readonly type = '[Routines] Get all routines';
}

export class SetRoutine {
  static readonly type = '[Calendar] Sets routine for the day';

  constructor(public isEvening: boolean, public date: Date) {}
}

export class SetVisibleDays {
  static readonly type = '[Calendar] Sets the visible dates.';

  constructor(public date:Date) {}
}

export class SetCalendarModel {
  static readonly type = '[Calendar] Sets the calendar model.';

  constructor(public isEvening: boolean) {}
}

export class SetCalendarSteps {
  static readonly type ='[Calendar] sets the current category product map'
}

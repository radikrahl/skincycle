import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { Routine } from 'src/app/shared/routines/models/routine.model';
import { DateService } from 'src/app/shared/services/date.service';
import { CalendarStepModel, VisibleDay } from '../models/calendar.model';
import { SetCalendarModel, SetRoutine, SetVisibleDays } from './actions';

export interface CalendarStateModel {
  routine?: Routine;
  visibleDays: VisibleDay[];
  isEvening: boolean;
  steps?: CalendarStepModel
}

@State<CalendarStateModel>({
  name: 'calendar',
  defaults: {
    visibleDays: [],
    isEvening: false,
  },
})
@Injectable()
export class CalendarState implements NgxsOnInit {
  constructor(private dateService: DateService) {}

  @Selector()
  static getVisibleDays(state: CalendarStateModel): VisibleDay[] {
    return state.visibleDays;
  }

  @Selector()
  static getCurrentDay(state: CalendarStateModel): VisibleDay {
    return state.visibleDays[1];
  }

  @Selector()
  static getRoutine(state: CalendarStateModel): Routine | undefined {
    return state.routine;
  }

  @Selector()
  static isEvening(state: CalendarStateModel): boolean {
    return state.isEvening;
  }

  ngxsOnInit(ctx: StateContext<CalendarStateModel>): void {
    ctx.patchState({
      isEvening: this.dateService.isEvening(),
      visibleDays: this.getVisibleDates(),
    });
  }

  @Action(SetVisibleDays)
  setDates(ctx: StateContext<CalendarStateModel>, payload: SetVisibleDays) {
    ctx.patchState({ visibleDays: this.getVisibleDates(payload.date) });
  }

  @Action(SetCalendarModel)
  setModel(ctx: StateContext<CalendarStateModel>, payload: SetCalendarModel) {
    ctx.patchState(payload);
  }

  @Action(SetRoutine)
  setRoutine(ctx: StateContext<CalendarStateModel>, payload: SetRoutine) {
    ctx.patchState({ routine: payload.routine });
  }

  private getVisibleDates(date: Date = new Date()): VisibleDay[] {
    return this.dateService.getVisibleDays(date).map((x) => new VisibleDay(x));
  }
}

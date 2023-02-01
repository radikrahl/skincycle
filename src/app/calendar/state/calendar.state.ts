import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { Routine } from 'src/app/calendar/models/routine.model';
import { DateService } from 'src/app/shared/services/date.service';
import { VisibleDay } from '../models/calendar.model';
import { SetCalendarModel, SetVisibleDays } from './actions';

export interface CalendarStateModel {
  routine?: Routine;
  visibleDays: VisibleDay[];
  isEvening: boolean;
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
    ctx.patchState({ isEvening: payload.isEvening });
  }
  private getVisibleDates(date: Date = new Date()): VisibleDay[] {
    return this.dateService.getVisibleDays(date).map((x) => new VisibleDay(x));
  }
}

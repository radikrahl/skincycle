import { Injectable } from '@angular/core';
import { subDays, addDays } from 'date-fns';

export class VisisibleDay {
  public name: string;
  public label: string;

  public day: number;
  public date: Date;
  constructor(date: Date) {
    const locale = 'de-De';
    this.date = date;
    this.name = date.toLocaleDateString(locale, { weekday: 'long' });
    this.label = date
      .toLocaleDateString(locale, { weekday: 'short' })
      .toLocaleUpperCase();
    this.day = date.getDate();
  }
}

@Injectable()
export class CalendarService {
  isEvening() {
    const today = new Date();
    return today.getHours() > 13;
  }

  getVisibleDays(date: Date): Date[] {
    const vDays: Array<Date> = [];
    const dayBefore = subDays(date, 1);
    const dayAfter = addDays(date, 1);

    vDays.push(dayBefore);
    vDays.push(date);
    vDays.push(dayAfter);

    return vDays;
  }
}

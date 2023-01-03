import { Injectable } from '@angular/core';
import { subDays, addDays } from 'date-fns';

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

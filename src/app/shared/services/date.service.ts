import { Injectable } from '@angular/core';
import { subDays, addDays, format, getYear, getDay } from 'date-fns';
import { de } from 'date-fns/locale';

@Injectable()
export class DateService {
  isEvening() {
    const today = new Date();
    return today.getHours() > 13;
  }

  currentMonth(date = new Date()) {
    return format(date, 'LLLL', { locale: de });
  }

  compareDays(dateOne: Date, dateTwo: Date) {
    const dateA = new Date(
      getYear(dateOne),
      dateOne.getMonth(),
      dateOne.getDate()
    );
    const dateB = new Date(
      getYear(dateTwo),
      dateTwo.getMonth(),
      dateTwo.getDate()
    );

    if (dateA.getTime() > dateB.getTime()) {
      return 1;
    }

    if (dateA.getTime() < dateB.getTime()) {
      return -1;
    }

    return 0;
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

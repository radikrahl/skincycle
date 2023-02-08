import { Injectable } from '@angular/core';
import { subDays, addDays, format } from 'date-fns';
import { de } from 'date-fns/locale';

@Injectable()
export class DateService {
  isEvening() {
    const today = new Date();
    return today.getHours() > 13;
  }

  currentMonth() {
    return format(new Date(), 'LLLL', { locale: de });
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

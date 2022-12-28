import { Injectable } from '@angular/core';
import { subDays, addDays } from 'date-fns';

export class VisisibleDay {

  public name: string;
  public label: string;

  public day: number;
  constructor(date: Date) {
    const locale = 'de-De';
    this.name = date.toLocaleDateString(locale, {weekday: 'long'});
    this.label = date.toLocaleDateString(locale, {weekday:'short'}).toLocaleUpperCase();
    this.day = date.getDate();
  }
}

@Injectable()
export class CalendarService {

  isEvening() {
    const today = new Date();
    return today.getHours() > 13;
  }

  getVisibleDays() {
    const vDays: Array<VisisibleDay> = [];
    const today = new Date();
    const yesterday = subDays(today, 1);
    const tommorow = addDays(today, 1);

    vDays.push(new VisisibleDay(yesterday))
    vDays.push(new VisisibleDay(today));
    vDays.push(new VisisibleDay(tommorow));

    return vDays;
  }
}

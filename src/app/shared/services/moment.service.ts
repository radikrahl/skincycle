import { Injectable } from '@angular/core';
import * as moment from 'moment';

/**
 * A wrapper for the moment library
 */
@Injectable()
export class MomentService {
  /**
   * Creates and returns a new moment object with the current date/time
   */
  public moment() {
    return moment();
  }

  // expose moment properties directly on the service
  public get utc() {
    return moment.utc;
  }
  public get version() {
    return moment.version;
  }
  public get unix() {
    return moment.unix;
  }
  public get isMoment() {
    return moment.isMoment;
  }
  public get isDate() {
    return moment.isDate;
  }
  public get isDuration() {
    return moment.isDuration;
  }
  public get now() {
    return moment.now;
  }

  public get customCalendar() {
    const calendar = [];
    const today = moment();
    const endDay = today.clone().add(1, 'days');

    const date = today.clone().subtract(1, 'day');
    while (date.isBefore(endDay, 'day'))
      calendar.push({
        days: Array(3)
          .fill(0)
          .map(() => {
           const x =  date.add(1, 'day').clone();
           return x;
          }),
      });
    return calendar;
  }

  public get calendar() {
    return moment(moment.now()).calendar({
      lastDay: '[Yesterday]',
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      lastWeek: '[last] dddd',
      nextWeek: 'dddd',
      sameElse: 'L',
    });
  }
}

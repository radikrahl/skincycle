import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class HeaderOptions {
  constructor(public title: string, public iconClass: string) {}
}

@Injectable({
  providedIn: 'root',
})
export class HeaderTitleService {
  private messageSource = new BehaviorSubject<HeaderOptions>(
    new HeaderOptions('', '')
  );
  optionsObservable = this.messageSource.asObservable();
  public onChange: EventEmitter<HeaderOptions> =
    new EventEmitter<HeaderOptions>();

  constructor() {}

  setHeaderOptions(message: HeaderOptions) {
    this.messageSource.next(message);
  }
}

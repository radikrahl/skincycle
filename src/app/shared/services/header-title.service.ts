import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class HeaderOptions {
  constructor(public title: string, public iconClass: string, public params?: Array<any>) {}
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

    public onClick: EventEmitter<string> = new EventEmitter<string>();

  public iconClick() {
    debugger;
    this.onClick.emit(this.messageSource.value.iconClass + "clicked!");
  }

  setHeaderOptions(message: HeaderOptions) {
    this.messageSource.next(message);
    this.onChange.emit(message);
  }
}

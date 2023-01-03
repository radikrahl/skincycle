import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export class HeaderOptions {
  constructor(
    public title: string,
    public iconClass: string,
    public callback: () => void
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class HeaderTitleService {
  private optionsSubject = new BehaviorSubject<HeaderOptions>(
    new HeaderOptions('', '', this.defaultCallback)
  );
  optionsObservable = this.optionsSubject.asObservable();
  public onChange: EventEmitter<HeaderOptions> =
    new EventEmitter<HeaderOptions>();

  constructor(private router: Router) {}

  public iconClick() {
    this.optionsSubject.value.callback();
  }

  setHeaderOptions(message: HeaderOptions) {
    this.optionsSubject.next(message);
    this.onChange.emit(message);
  }

  defaultCallback() {
    this.router.navigateByUrl('/');
  }
}

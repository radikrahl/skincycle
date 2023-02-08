import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { HeaderOptions } from './models/options.model';

import { IconClick } from './state/actions';
import { HeaderState } from './state/header.state';

@Component({
  selector: 'sc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  public logo = {
    url: '../../../assets/images/logo-small.svg',
  };

  options?: HeaderOptions;

  @Select(HeaderState)
  options$!: Observable<HeaderOptions>;

  constructor(public router: Router, private store: Store) {
  }

  iconClick() {
    this.store.dispatch(new IconClick);
  }
}

import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {
  HeaderOptions,
  HeaderTitleService,
} from 'src/app/shared/services/header-title.service';

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

  public menu = {
    url: '../../../assets/icons/burger-slim.svg',
    open: false,
    burgerUrl: '../../../assets/icons/burger-slim.svg',
    closeUrl: '../../../assets/icons/close-bold.svg',
  };

  options?: HeaderOptions;
  constructor(public router: Router, private service: HeaderTitleService) {
    this.service.optionsObservable.subscribe({
      next: (options: HeaderOptions) => {
        this.options = options;
      },
    });
  }

  toggleMenu() {
    this.menu.open = !this.menu.open;
    this.menu.url = this.menu.open ? this.menu.closeUrl : this.menu.burgerUrl;
  }

  iconClick() {
    this.service.iconClick();
  }
}

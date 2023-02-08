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

  options?: HeaderOptions;
  constructor(public router: Router, private service: HeaderTitleService) {
    this.service.optionsObservable.subscribe({
      next: (options: HeaderOptions) => {
        this.options = options;
      },
    });
  }

  iconClick() {
    this.service.iconClick();
  }
}

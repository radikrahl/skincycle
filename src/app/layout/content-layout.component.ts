import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';

@Component({
  selector: 'sc-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent {
  config = {
    pageTitle: '',
    iconClass: '',
  };
  pageTitle: string = '';
  constructor(router: ActivatedRoute, router2: Router) {
    var data = router.firstChild?.snapshot?.data;
    if (data) {
      this.config.pageTitle = data['title'];
      this.config.iconClass = data['actionIconClass'];
    }
  }
}

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  public logo = {
    url: "../../../assets/images/logo-small.svg"
  }
  constructor() {}
}

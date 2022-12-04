import { Component } from '@angular/core';
import {
  HeaderOptions,
  HeaderTitleService,
} from 'src/app/services/header-title.service';
import { FrontendBaseComponent } from '../base.component';

@Component({
  selector: 'sc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends FrontendBaseComponent {
  constructor(titleService: HeaderTitleService) {
    super(titleService, new HeaderOptions('', 'sc-icon-close'));
  }
}

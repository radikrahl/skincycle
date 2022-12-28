import { Component, Renderer2 } from '@angular/core';
import {
  HeaderOptions,
  HeaderTitleService,
} from 'src/app/shared/services/header-title.service';
import { FrontendBaseComponent } from '../../base.component';

@Component({
  selector: 'sc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends FrontendBaseComponent {
  public headerOptions: HeaderOptions = new HeaderOptions('', 'sc-icon-close');
  public themeClass = 'theme';
  constructor(titleService: HeaderTitleService, renderer: Renderer2) {
    super(titleService, renderer);
  }
}

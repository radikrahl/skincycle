import { Component, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';

import { FrontendBaseComponent } from 'src/app/core/components/base.component';
import { Store } from '@ngxs/store';
import { HeaderOptions } from '../header/models/options.model';

@Component({
  selector: 'sc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent extends FrontendBaseComponent {
  public headerOptions: HeaderOptions = new HeaderOptions(
    '',
    'sc-icon-close',
    this.headerCallback.bind(this)
  );
  public themeClass = 'theme';
  constructor(private location: Location, store: Store, renderer: Renderer2) {
    super(store, renderer);
  }

  headerCallback() {
    this.location.back();
  }
}

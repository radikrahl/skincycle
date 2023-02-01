import { Component, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { HeaderOptions, HeaderTitleService } from 'src/app/shared/services/header-title.service';
import { FrontendBaseComponent } from 'src/app/core/components/base.component';
import { RouterModule } from '@angular/router';
import { ContentLayoutModule } from '../content-layout.module';

@Component({
  selector: 'sc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [RouterModule, ContentLayoutModule],
})
export class MenuComponent extends FrontendBaseComponent {
  public headerOptions: HeaderOptions = new HeaderOptions(
    '',
    'sc-icon-close',
    this.headerCallback.bind(this)
  );
  public themeClass = 'theme';
  constructor(
    private location: Location,
    titleService: HeaderTitleService,
    renderer: Renderer2
  ) {
    super(titleService, renderer);
  }

  headerCallback() {
    this.location.back();
  }
}

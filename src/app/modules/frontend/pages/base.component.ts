import {
  HeaderOptions,
  HeaderTitleService,
} from 'src/app/services/header-title.service';

export abstract class FrontendBaseComponent {
  protected headerOptions: HeaderOptions;

  constructor(
    private headerTitleService: HeaderTitleService,
    options: HeaderOptions
  ) {
    this.headerOptions = options;
    this.setHeader();
  }

  private setHeader() {
    this.headerTitleService.setHeaderOptions(this.headerOptions);
  }
}

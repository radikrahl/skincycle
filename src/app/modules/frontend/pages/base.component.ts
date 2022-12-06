import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import {
  HeaderOptions,
  HeaderTitleService,
} from 'src/app/shared/services/header-title.service';

@Component({
  selector: 'sc-base',
  template: '<div></div>'
})
export abstract class FrontendBaseComponent implements OnInit, OnDestroy {
  public abstract headerOptions: HeaderOptions;
  public abstract themeClass: string;
  constructor(
    private headerTitleService: HeaderTitleService,
    private renderer: Renderer2
  ) {}
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, this.themeClass)
  }
  ngOnInit(): void {
    this.headerTitleService.setHeaderOptions(this.headerOptions);
    this.renderer.addClass(document.body, this.themeClass);
  }
}

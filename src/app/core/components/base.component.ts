import { Directive, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngxs/store';
import { HeaderOptions } from 'src/app/layout/header/models/options.model';
import { SetHeader } from 'src/app/layout/header/state/actions';


@Directive()
export abstract class FrontendBaseComponent implements OnInit, OnDestroy {
  public abstract headerOptions: HeaderOptions;
  public abstract themeClass: string;
  constructor(protected store: Store, protected renderer: Renderer2) {}
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, this.themeClass);
  }
  ngOnInit(): void {
    this.store.dispatch(new SetHeader(this.headerOptions));
    this.renderer.addClass(document.body, this.themeClass);
  }

  public abstract headerCallback(): void;
}

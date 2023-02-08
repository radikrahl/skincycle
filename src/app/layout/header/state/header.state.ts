import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { HeaderOptions } from '../models/options.model';
import { IconClick, SetHeader, SetHeaderIcon } from './actions';

@State<HeaderOptions>({
  name: 'header',
  defaults: {
    title: '',
    callback: () => {
      console.log('init');
    },
    iconClass: '',
  },
})
@Injectable()
export class HeaderState {
  @Action(SetHeader)
  setHeader(ctx: StateContext<HeaderOptions>, payload: SetHeader) {
    ctx.setState(payload.options);
  }

  @Action(IconClick)
  iconClick(ctx: StateContext<HeaderOptions>) {
    ctx.getState().callback();
  }

  @Action(SetHeaderIcon)
  setHeaderIcon(ctx: StateContext<HeaderOptions>, payload: SetHeaderIcon) {
    ctx.patchState({ iconClass: payload.iconClass });
  }
}

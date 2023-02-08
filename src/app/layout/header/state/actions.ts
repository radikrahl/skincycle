import { HeaderOptions } from "../models/options.model";

export class SetHeader {
  static readonly type = '[Header] sets header.';

  constructor(public options: HeaderOptions) {}
}

export class IconClick {
  static readonly type = '[Header] Calls callback function.';
}

export class SetHeaderIcon {
  static readonly type = '[Header] Sets Header icon.';
  constructor(public iconClass: string) {}
}

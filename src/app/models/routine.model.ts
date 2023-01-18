import { BaseEntity } from "./base.model";

export class Routine extends BaseEntity {
  public day?: string;
  public daytime?: string;

  public base = "";
}

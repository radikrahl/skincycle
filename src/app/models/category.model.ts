import { BaseEntity } from './base.model';

export class Category extends BaseEntity {
  public name = '';
  public label = '';

  constructor() {
    super();
  }
}

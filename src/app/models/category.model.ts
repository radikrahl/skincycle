import { BaseEntity } from './base.model';

export class Category extends BaseEntity {
  public name: string = '';
  public label: string = '';

  constructor() {
    super();
  }
}

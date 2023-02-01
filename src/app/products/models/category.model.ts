import { BaseEntity } from '../../core/models/base.model';

export class Category extends BaseEntity {
  public name = '';
  public label = '';

  constructor() {
    super();
  }
}

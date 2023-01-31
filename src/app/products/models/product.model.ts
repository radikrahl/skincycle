import { BaseEntity } from '../../models/base.model';
import { Ingredient } from '../../calendar/models/ingredient.model';

export class Product extends BaseEntity {
  public name?: string;
  public fullName?: string;
  public company?: string;
  public ingredients: string[] = [];
  public price: string | number = 0;

  public url?: string;
  public usages: Array<string> = []; //Usage[];
  public category?: string;
  public isAvailable = false;
  public skinStatus: Array<string> = []; //SkinStatus[];
  public amount?: string;

  public hint?: Array<string> = [];
  constructor() {
    super();
  }
}

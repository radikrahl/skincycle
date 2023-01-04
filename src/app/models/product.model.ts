import { BaseEntity } from './base.model';
import { Ingredient } from './ingredient.model';

export class Product extends BaseEntity {
  public name?: string;
  public fullName?: string;
  public company?: string;
  public ingredients: Ingredient[] = [];
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

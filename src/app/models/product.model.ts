import { Ingredient } from "./ingredient.model";

export class Product {
  public name?: string;

  public fullName?: string
  public company?: string;
  public ingredients: Ingredient[] = [];
  public price?: string;
  public url?: string;
  public usages: Array<string> = []; //Usage[];
  public category?: string;
  public isAvailable: boolean = false;
  public skinStatus: Array<string> = []; //SkinStatus[];
  public amount?: string;
  constructor() {

  }
}

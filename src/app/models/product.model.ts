import { Ingredient } from './ingredient.model';

export class Product {
  public name?: string;

  public fullName?: string;
  public company?: string;
  public ingredients: string[] = [];
  private _price?: string | undefined;
  public get price(): string | undefined {
    return Number.parseFloat(this._price ?? '0').toLocaleString('de-DE', {
      style: 'currency',
      currency: 'EUR',
    });
  }
  public set price(value: string | undefined) {
    this._price = value;
  }
  public url?: string;
  public usages: Array<string> = []; //Usage[];
  public category?: string;
  public isAvailable: boolean = false;
  public skinStatus: Array<string> = []; //SkinStatus[];
  public amount?: string;
  constructor() {}
}

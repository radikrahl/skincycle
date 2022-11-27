import { Ingredient } from "./ingredient.model";

export class Product {
  public name: string;
  public company: string;
  public ingredients: Ingredient[];
  public price: string;
  public url: string;
  public usages: Array<string>; //Usage[];
  public categories: Array<string>; //Category;
  public isAvailable: boolean;
  public skinStatus: Array<string>; //SkinStatus[];
  public amount: string;
  constructor(private csvRow: string) {
    let values = this.csvRow.split(',');
    this.name = values[ProductCsvHead.Produkt];
    this.company = values[ProductCsvHead.Firma];
    this.ingredients = values[ProductCsvHead.Inhaltsstoffe]?.split(';').map(x => {
      return new Ingredient(x);
    });
    this.skinStatus = values[ProductCsvHead.Hautzustand]?.split(';');
    this.usages = values[ProductCsvHead.Anwendung]?.split(';');
    this.categories = values[ProductCsvHead.Kat]?.split(';');
    this.isAvailable = values[ProductCsvHead.Da] == IsAvailableEnum.True;
    this.price = values[ProductCsvHead.Preis];
    this.url = values[ProductCsvHead.Link];
    this.amount = values[ProductCsvHead.Menge];
  }
}

enum IsAvailableEnum {
  True = "Ja",
  False = "Nein"
}
enum ProductCsvHead {
  Firma,
  Produkt,
  Inhaltsstoffe,
  Hautzustand,
  Anwendung,
  Kat,
  Da,
  Menge,
  Preis,
  Link,
}

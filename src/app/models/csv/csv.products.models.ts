import { ICsvEntity } from 'src/app/services/csv/csv.service';
import { Product } from '../product.model';

export class CsvProduct extends Product implements ICsvEntity {
  constructor(private csvRow: string) {
    super();
    const values = this.csvRow.split(',');
    this.name = values[ProductCsvHead.Name];
    this.fullName = values[ProductCsvHead.Fullname];
    this.company = values[ProductCsvHead.Firma];
    this.ingredients = values[ProductCsvHead.Inhaltsstoffe]?.split(';');
    // .map((x) => {
    //   return new Ingredient(x);
    // });
    this.skinStatus = values[ProductCsvHead.Hautzustand]?.split(';');
    this.usages = values[ProductCsvHead.Anwendung]?.split(';');
    this.category = values[ProductCsvHead.Kat];
    this.isAvailable = values[ProductCsvHead.Da] == IsAvailableEnum.True;
    this.price = values[ProductCsvHead.Preis];
    this.url = values[ProductCsvHead.Link];
    this.amount = values[ProductCsvHead.Menge];
  }
}

enum IsAvailableEnum {
  True = 'Ja',
  False = 'Nein',
}
enum ProductCsvHead {
  Firma,
  Name,
  Fullname,
  Inhaltsstoffe,
  Hautzustand,
  Anwendung,
  Kat,
  Da,
  Menge,
  Preis,
  Link,
}

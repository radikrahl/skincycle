import { ICsvEntity } from 'src/app/services/csv/csv.service';
import { Product } from './product.model';

export class CsvProduct extends Product implements ICsvEntity {
  constructor(private csvRow: string) {
    super();
    const values = this.csvRow.split(',');
    this.name = values[ProductCsvHead.Name];
    this.fullName = values[ProductCsvHead.Fullname];
    this.company = values[ProductCsvHead.Firma];
    this.ingredients = values[ProductCsvHead.Inhaltsstoffe]
      ?.split('; ')
      // .map((x) => new Ingredient(x));
    this.skinStatus = values[ProductCsvHead.Hautzustand]?.split('; ');
    this.usages = values[ProductCsvHead.Anwendung]?.split('; ');
    this.category = values[ProductCsvHead.Kat];
    this.isAvailable = values[ProductCsvHead.Inventar] == IsAvailableEnum.True;
    this.price = values[ProductCsvHead.Preis];
    this.url = values[ProductCsvHead.Link];
    this.amount = values[ProductCsvHead.Menge];
    this.hint = values[ProductCsvHead.Hinweis]?.split('; ');
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
  Hinweis,
  Kat,
  Inventar,
  Menge,
  Preis,
  Link,
}

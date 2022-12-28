import { ICsvEntity } from "../services/csv/csv.service";
import { BaseEntity } from "./base.model";
import { Ingredient } from "./ingredient.model";

export class IngredientRelations extends BaseEntity {
  public label?: string;

  public prio = 0;
  public ingredients: Array<Ingredient> = [];
  public effect: string[] = [];

  constructor() {
    super();
  }
}

export class CsvIngredientRelations extends IngredientRelations implements ICsvEntity {
  constructor(private csvRow: string) {
    super();
    const values = this.csvRow.split(',');
    this.label = values[CsvHead.Label];
    this.prio = Number.parseInt(values[CsvHead.Prio]);
    this.ingredients = values[CsvHead.WichtigeWirkstoffe]?.split('; ').map(x => new Ingredient(x));
    this.effect = values[CsvHead.Wirkung].split(';');
  }
}


enum CsvHead {
  Label,
  Prio,
  WichtigeWirkstoffe,
  Wirkung,
  GutKombinierbarMit
}

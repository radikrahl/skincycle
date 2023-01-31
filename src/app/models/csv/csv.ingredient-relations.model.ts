import { ICsvEntity } from "src/app/services/csv/csv.service";
import { IngredientRelations } from "../../calendar/models/ingredient-relations.model";
import { Ingredient } from "../../calendar/models/ingredient.model";

export class CsvIngredientRelations
  extends IngredientRelations
  implements ICsvEntity
{
  constructor(private csvRow: string) {
    super();
    const values = this.csvRow.split(',');
    this.label = values[CsvHead.Label];
    this.prio = Number.parseInt(values[CsvHead.Prio]);
    this.ingredients = values[CsvHead.Wirkstoffname]
      ?.split('; ')
      .map((x) => new Ingredient(x));
    this.effect = values[CsvHead.Wirkung].split('; ');
    this.combinableWith = values[CsvHead.Kombinierbar].split('; ');
  }
}

enum CsvHead {
  Label,
  Prio,
  Wirkstoffname,
  Wirkung,
  Kombinierbar,
}

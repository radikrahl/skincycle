import { ICsvEntity } from "src/app/services/csv/csv.service";
import { Category } from "../category.model";

export class CsvCategory extends Category implements ICsvEntity {
  constructor(private csvRow: string) {
    super();
    let values = this.csvRow.split(',');
    this.name = values[CategoryCsvHead.Name];
    this.label = values[CategoryCsvHead.Label];
  }
}

enum CategoryCsvHead {
  Name,
  Label
}

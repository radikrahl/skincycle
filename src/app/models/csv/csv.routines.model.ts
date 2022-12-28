import { ICsvEntity } from "src/app/services/csv/csv.service";
import { Routine } from "../routine.model";

export class CsvRoutine extends Routine implements ICsvEntity {
  constructor(private csvRow: string) {
    super();
    const values = this.csvRow.split(',');
    this.day = values[CsvHead.Tag];
    this.daytime = values[CsvHead.Tageszeit];
    this.base = values[CsvHead.Basis];
  }
}

enum CsvHead {
  Tag,
  Tageszeit,
  Basis
}

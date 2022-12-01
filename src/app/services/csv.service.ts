import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { CsvProduct } from "../models/csv/csvModels";
import { Product } from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  constructor(private httpClient: HttpClient) {

  }
  public getAll() {
    var csv = this.httpClient.get('../assets/data/products.csv', {
      responseType: 'text',
    }).pipe(map((x) => {
      return this.importDataFromCSV<CsvProduct>(x, CsvProduct);
    }));
    return csv;
  }

  private importDataFromCSV<T>(csvText: string, type: {new(row: string): T}, item?: ICsvModel): Array<T> {
    const propertyNames = csvText.slice(0, csvText.indexOf('\n')).split(',');
    const dataRows = csvText.slice(csvText.indexOf('\n') + 1).split('\n');
    let dataArray: Array<T> = [];
    dataRows.forEach((row) => {
      dataArray.push(new type(row));
    });
    return dataArray;
  }
}

export interface ICsvModel {

}

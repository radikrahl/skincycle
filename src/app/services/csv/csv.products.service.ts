import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CsvProduct } from 'src/app/models/csv/csv.products.models';
import { CsvService } from './csv.service';

@Injectable()
export class CsvProductsService extends CsvService<CsvProduct> {
  constructor(httpClient: HttpClient) {
    super(httpClient, '../assets/data/products.csv');
  }
  public getAll(): Observable<CsvProduct[]> {
    return super
      .httpGet(this.url)
      .pipe(map((x) => this.importDataFromCSV(x, CsvProduct)));
  }
}

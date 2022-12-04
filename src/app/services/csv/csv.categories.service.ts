import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CsvCategory } from 'src/app/models/csv/csv.categories.model';
import { CsvService } from './csv.service';

@Injectable()
export class CsvCategoriesService extends CsvService<CsvCategory> {
  constructor(httpClient: HttpClient) {
    super(httpClient, '../assets/data/categories.csv');
  }
  public getAll(): Observable<CsvCategory[]> {
    return super
      .httpGet(this.url)
      .pipe(map((x) => this.importDataFromCSV(x, CsvCategory)));
  }
}

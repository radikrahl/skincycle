import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { CsvCategory } from 'src/app/models/csv/csv.categories.model';
import { CsvService } from './csv.service';

@Injectable()
export class CsvCategoriesService extends CsvService<CsvCategory> {
  public items?: CsvCategory[];
  protected url: string;
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.url = '../assets/data/categories.csv';

    this.getAll().subscribe({
      next: (x) => (this.items = x),
      error: (err) => console.error(err),
      complete: () => {
        console.debug('finished with categories.csv');
      },
    });
  }
  public getAll(): Observable<CsvCategory[]> {
    if (this.items) return of(this.items);

    return super
      .httpGet(this.url)
      .pipe(map((x) => this.importDataFromCSV(x, CsvCategory)));
  }
}

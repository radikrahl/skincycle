import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { CsvIngredientRelations } from 'src/app/models/ingredient-relations.model';
import { CsvService } from './csv.service';

@Injectable()
export class CsvIngredientRelationsService extends CsvService<CsvIngredientRelations> {
  public items?: CsvIngredientRelations[];
  protected url: string;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.url = '../assets/data/wirkstoffe.csv';
    this.getAll().subscribe({
      next: (x) => (this.items = x),
      error: (err) => console.error('failed with wirkstoffe', err),
      complete: () => {
        console.debug('finished with wirkstoffe.csv');
      },
    });
  }
  public getAll(): Observable<CsvIngredientRelations[]> {
    if (this.items) return of(this.items);

    return super
      .httpGet(this.url)
      .pipe(map((x) => this.importDataFromCSV(x, CsvIngredientRelations)));
  }

  public getByLabel(
    label: string | undefined
  ): Observable<CsvIngredientRelations | undefined> {
    return this.getAll().pipe(
      map((relations) => {
        return relations?.find((relation) => relation.label === label);
      })
    );
  }
}

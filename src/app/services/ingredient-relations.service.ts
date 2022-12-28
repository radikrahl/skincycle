import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { CsvIngredientRelations, IngredientRelations } from '../models/ingredient-relations.model';
import { Product } from '../models/product.model';
import { ApiService } from './api.service';
import { CsvService } from './csv/csv.service';

@Injectable()
export class IngredientRelationsService extends ApiService<IngredientRelations> {
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl + 'api/ingredientrelations');
  }
}

@Injectable()
export class CsvIngredientRelationsService extends CsvService<CsvIngredientRelations> {

  constructor(httpClient: HttpClient) {
    super(httpClient, '../assets/data/wirkstoffe.csv');
  }
  public getAll(): Observable<CsvIngredientRelations[]> {
    return super
      .httpGet(this.url)
      .pipe(map((x) => this.importDataFromCSV(x, CsvIngredientRelations)));
  }

  public getByLabel(label: string): Observable<CsvIngredientRelations | undefined> {
    return this.getAll().pipe(map(x => {
      return x.find(y => y.label === label);
    }));
  }
}

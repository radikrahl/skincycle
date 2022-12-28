import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { CsvProduct } from 'src/app/models/csv/csv.products.model';
import { IngredientRelations } from 'src/app/models/ingredient-relations.model';
import { Product } from 'src/app/models/product.model';
import { CsvService } from './csv.service';

@Injectable()
export class CsvProductsService extends CsvService<CsvProduct> {
  public products: Product[] = [];

  constructor(httpClient: HttpClient) {
    super(httpClient, '../assets/data/products.csv');
    this.getAll();
  }
  public getAll(): Observable<CsvProduct[]> {
    return super
      .httpGet(this.url)
      .pipe(map((x) => this.importDataFromCSV(x, CsvProduct)))
      .pipe(
        tap((products) => {
          products.map((product) => {
            product.price = Number.parseFloat(
              product.price as string
            ).toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR',
            });
          });
          this.products = products;
        })
      );
  }

  public getProductsForWirkstoff(
    categoryName: string,
    relations?: IngredientRelations
  ) {
    return this.getAll().pipe(
      map((products) => {
        return products.filter((product) => {
          if (product.category !== categoryName) return;
            return product.ingredients.some((r) =>
              relations?.ingredients.some((tN) => tN.name === r.name)
            );
        });
      })
    );
  }
}

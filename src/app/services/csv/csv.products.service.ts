import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { CsvProduct } from 'src/app/models/csv/csv.products.model';
import { IngredientRelations } from 'src/app/models/ingredient-relations.model';
import { Product } from 'src/app/models/product.model';
import { CsvService } from './csv.service';

@Injectable()
export class CsvProductsService extends CsvService<CsvProduct> {
  protected url: string;
  public items?: CsvProduct[] | undefined;

  constructor(httpClient: HttpClient) {
    super(httpClient);

    this.url = '../assets/data/products.csv';
    this.getAll().subscribe({
      next: (x) => (this.items = x),
      error: (err) => console.log(err),
      complete: () => {
        console.log('finished with products.csv');
      },
    });
  }
  public getAll(): Observable<CsvProduct[]> {
    if (this.items) return of(this.items);

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
        })
      );
  }

  public getProductsByCategory(
    category: string
  ): Observable<CsvProduct[] | undefined> {
    return of(this.items?.filter((product) => product.category === category));
  }

  public getProductsForWirkstoff(
    categoryName: string,
    relations?: IngredientRelations
  ) {
    return of(this.items).pipe(
      map((products) => {
        return products?.filter((product) => {
          if (product.category !== categoryName) return;
          return product.ingredients.some((r) =>
            relations?.ingredients.some((tN) => tN.name === r.name)
          );
        });
      })
    );
  }
}

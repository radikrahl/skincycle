import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { CsvProduct } from 'src/app/models/csv/csv.products.model';
import { IngredientRelations } from 'src/app/models/ingredient-relations.model';
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
      error: (err) => console.error('failed getting products', err),
      complete: () => {
        console.debug('finished with products.csv');
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

  public getProductsByCategory(products: CsvProduct[], category: string) {
    return products.filter((product) => product.category === category);
  }

  public getProductsForWirkstoff(
    products: CsvProduct[],
    relations?: IngredientRelations
  ) {
    return products.filter((product) => {
      return product.ingredients.some((productIngredient) =>
        relations?.ingredients.some((relationIngredient) =>
          productIngredient.name.includes(relationIngredient.name)
        )
      );
    });
  }
}

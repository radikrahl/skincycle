import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { IngredientRelations } from '../models/ingredient-relations.model';
import { Product } from '../models/product.model';
import { ApiService } from './api.service';

@Injectable()
export class ProductsService extends ApiService<Product> {
  public products: Product[] = [];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl + 'api/products');
  }

  public override getAll(): Observable<Product[]> {
    return super.getAll().pipe(
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
    relations: IngredientRelations,
    categoryName: string
  ) {
    return this.getAll().pipe(
      map((products) => {
        return products.filter((product) => {
          if (product.category !== categoryName) return;

            return product.ingredients.some((r) =>
              relations.ingredients.some((tN) => tN.name === r.name)
            );
          return false;
        });
      })
    );
  }
}

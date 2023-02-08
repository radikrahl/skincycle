import { createSelector, Selector } from '@ngxs/store';
import { IngredientRelations } from 'src/app/calendar/models/ingredient-relations.model';
import { Product } from '../models/product.model';
import { ProductsState } from '../state/products.state';

export type CategoryProductMap = {
  [key: string]: Product[] | null;
};


export class ProductsQueries {
  @Selector([ProductsState.entities()])
  static getProducts(products: Product[]): Product[] {
    return products;
  }

  static getProductsByCategory(categoryName: string) {
    return createSelector(
      [ProductsQueries.getProducts],
      (products: Product[]) => {
        return products.filter((product) => product.category === categoryName);
      }
    );
  }

  static getProductsForIngredients(relations: IngredientRelations) {
    return createSelector(
      [ProductsQueries.getProducts],
      (products: Product[]) => {
        return products.filter((product) => {
          return product.ingredients.some((r) =>
            relations.ingredients.some((tN) => tN === r)
          );
        });
      }
    );
  }
}

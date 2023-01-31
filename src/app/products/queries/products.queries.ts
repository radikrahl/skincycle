import { createSelector, Selector } from '@ngxs/store';
import { IngredientRelations } from 'src/app/ingredients/models/ingredient-relations.model';
import { Category } from 'src/app/models/category.model';
import { Product } from '../models/product.model';
import { CategoriesState } from '../state/categories.state';
import { ProductsState, ProductsStateModel } from '../state/products.state';

export class ProductsQueries {
  @Selector([ProductsState.products])
  static getProducts(state: ProductsStateModel): Product[] {
    return state.products;
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
            relations.ingredients.some((tN) => tN.name === r)
          );
        });
      }
    );
  }

  @Selector([CategoriesState.categories, ProductsState.products])
  static getProductsForCategories(categories: Category[], products: Product[]) {
    return categories.map((category) => {
      return {
        category: category,
        products: products.filter(
          (product) => product.category === category.label
        ),
      };
    });
  }
}

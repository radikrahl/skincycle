import { createSelector, Selector } from "@ngxs/store";
import { Product } from "src/app/products/models/product.model";
import { ProductsQueries } from "src/app/products/queries/products.queries";
import { Category } from "src/app/shared/categories/models/category.model";
import { CategoriesState } from "src/app/shared/categories/state/categories.state";
import { CalendarStepModel } from "../models/calendar.model";

export class CalendarSelectors {
  @Selector([CategoriesState.entities(), ProductsQueries.getProducts])
  static getCategoryStepModel(
    categories: Category[],
    products: Product[]
  ): CalendarStepModel[] {
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

import { createSelector, Selector } from '@ngxs/store';
import { Product } from 'src/app/products/models/product.model';
import { ProductsQueries } from 'src/app/products/queries/products.queries';
import { Category } from 'src/app/shared/categories/models/category.model';
import { CategoriesState } from 'src/app/shared/categories/state/categories.state';
import { Routine } from 'src/app/shared/routines/models/routine.model';
import { VisibleDay } from '../models/calendar.model';
import { IngredientRelations } from '../../ingredients/models/ingredient-relations.model';
import { CalendarStateModel } from '../state/calendar.state';

export class CalendarSelectors {
  @Selector([CategoriesState.entities(), ProductsQueries.getProducts])
  static getCategoryStepModel(categories: Category[], products: Product[]) {
    return (relations?: IngredientRelations) =>
      categories.map((category) => {
        let productTemp = products.filter(
          (product) => product.category === category.label
        );
        if (relations) {
          productTemp = productTemp.filter((product) =>
            product.ingredients.some((productIngredient) =>
              relations.ingredients.some((relationIngredient) =>
                productIngredient.includes(relationIngredient)
              )
            )
          );
        }

        return {
          category: category,
          products: productTemp,
        };
      });
  }

  static getCategoryStepModel2(products: Product[]) {
    return createSelector(
      [CategoriesState.entities()],
      (categories: Category[]) =>
        categories.map((category) => {
          return {
            category: category,
            products: products.filter(
              (product) => product.category === category.label
            ),
          };
        })
    );
  }

  @Selector()
  static getVisibleDays(state: CalendarStateModel): VisibleDay[] {
    return state.visibleDays;
  }

  @Selector()
  static getCurrentDay(state: CalendarStateModel): VisibleDay {
    return state.visibleDays[1];
  }

  @Selector()
  static getRoutine(state: CalendarStateModel): Routine | undefined {
    return state.routine;
  }

  @Selector()
  static isEvening(state: CalendarStateModel): boolean {
    return state.isEvening;
  }
}

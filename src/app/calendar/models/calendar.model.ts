import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/products/models/product.model';
import { IngredientRelations } from './ingredient-relations.model';

export class VisibleDay {
  public name: string;
  public label: string;

  public day: number;
  public date: Date;
  constructor(date: Date) {
    const locale = 'de-De';
    this.date = date;
    this.name = date.toLocaleDateString(locale, { weekday: 'long' });
    this.label = date
      .toLocaleDateString(locale, { weekday: 'short' })
      .toLocaleUpperCase();
    this.day = date.getDate();
  }
}

export class CalendarModel {
  public visibleDays: VisibleDay[];
  public today: Date;

  constructor(visibleDays: VisibleDay[]) {
    this.visibleDays = visibleDays;
    this.today = new Date();
  }
}

export interface CalendarStepModel {
  category: Category;
  products: Product[];
  relations?: IngredientRelations;
}

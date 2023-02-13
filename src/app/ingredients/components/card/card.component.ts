import { Component, Input } from '@angular/core';
import { IngredientRelations } from '../../models/ingredient-relations.model';

@Component({
  selector: 'sc-ingredient-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class IngredientCardComponent {
  @Input() relation: IngredientRelations = new IngredientRelations();
}

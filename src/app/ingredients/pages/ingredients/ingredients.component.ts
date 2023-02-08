import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FrontendBaseComponent } from 'src/app/core/components/base.component';
import { HeaderOptions } from 'src/app/layout/header/models/options.model';
import { IngredientRelations } from '../../models/ingredient-relations.model';
import { IngredientsState } from '../../state/ingredients.state';

@Component({
  selector: 'sc-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent extends FrontendBaseComponent {
  public headerOptions: HeaderOptions = new HeaderOptions('Wirkstoffe', 'sc-icon-add', this.headerCallback.bind(this));
  public themeClass = 'theme-red';

  @Select(IngredientsState.entities())
  public ingredients$!: Observable<IngredientRelations[]>

  public headerCallback(): void {
    throw new Error('Method not implemented.');
  }

}

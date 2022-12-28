import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IngredientRelations } from '../models/ingredient-relations.model';
import { ApiService } from './api.service';

@Injectable()
export class IngredientRelationsService extends ApiService<IngredientRelations> {
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl + 'api/ingredientrelations');
  }
}

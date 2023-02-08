import { createSelector } from "@ngxs/store";
import { Entity } from "../models/base.model";

export interface EntitiesStateModel<T extends Entity> {
  entities: T[]
}

export abstract class EntitiesState {
  static entities<T extends Entity>() {
    return createSelector([this], (state: EntitiesStateModel<T>) => {
      return state.entities;
    });
  }
}

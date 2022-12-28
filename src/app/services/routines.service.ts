import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Routine } from "../models/routine.model";
import { ApiService } from "./api.service";

@Injectable()
export class RoutineService extends ApiService<Routine> {
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl + 'api/routines');
  }
}

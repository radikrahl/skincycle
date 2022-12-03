import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { BaseEntity } from "src/app/models/base.model";
import { CsvCategory } from "src/app/models/csv/csv.categories.model";
import { ApiService } from "../api.service";
import { CsvService } from "./csv.service";

@Injectable({
  providedIn: 'root'
})
export class CsvCategoriesService extends CsvService<CsvCategory> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "../assets/data/categories.csv");
  }
  public getAll(): Observable<CsvCategory[]> {
    debugger;
    return super.httpGet(this.url).pipe(map(x => this.importDataFromCSV(x, CsvCategory)));
  }
}

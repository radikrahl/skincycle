import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CsvRoutine } from 'src/app/models/csv/csv.routines.model';
import { CsvService } from './csv.service';

@Injectable()
export class CsvRoutinesService extends CsvService<CsvRoutine> {
  constructor(httpClient: HttpClient) {
    super(httpClient, '../assets/data/routinen.csv');
  }
  public getAll(): Observable<CsvRoutine[]> {
    return super
      .httpGet(this.url)
      .pipe(map((x) => this.importDataFromCSV(x, CsvRoutine)));
  }
}

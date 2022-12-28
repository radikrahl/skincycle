import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { CsvRoutine } from 'src/app/models/csv/csv.routines.model';
import { Routine } from 'src/app/models/routine.model';
import { CsvService } from './csv.service';

@Injectable()
export class CsvRoutinesService extends CsvService<CsvRoutine> {
  public routines: CsvRoutine[] = [];

  constructor(httpClient: HttpClient) {
    super(httpClient, '../assets/data/routinen.csv');
    this.getAll();
  }
  public getAll(): Observable<CsvRoutine[]> {
    return super.httpGet(this.url).pipe(
      map((x) => {
        const routinesCsv = this.importDataFromCSV(x, CsvRoutine);
        this.routines = routinesCsv;
        return routinesCsv;
      })
    );
  }

  public getRoutine(isEvening: boolean): Observable<CsvRoutine | undefined> {
    return this.getAll().pipe(
      map((routines) =>
        routines.find((routine) => {
          return (
            routine.day ===
              new Date().toLocaleDateString('de-DE', { weekday: 'long' }) &&
            (isEvening
              ? routine.daytime == 'abends'
              : routine.daytime == 'morgens')
          );
        })
      )
    );
  }

  public getByBase(label: string): CsvRoutine[] {
    return this.routines.filter((x) => x.base === label);
  }
}

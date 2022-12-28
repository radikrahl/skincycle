import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { CsvRoutine } from 'src/app/models/csv/csv.routines.model';
import { CsvService } from './csv.service';

@Injectable()
export class CsvRoutinesService extends CsvService<CsvRoutine> {
  public items?: CsvRoutine[];
  protected url: string;
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.url = '../assets/data/routinen.csv';
    this.getAll().subscribe({
      next: (x) => (this.items = x),
      error: (err) => console.log(err),
      complete: () => {
        console.log('finished with routinen.csv');
      },
    });
  }
  public getAll(): Observable<CsvRoutine[]> {
    if (this.items) return of(this.items);

    return super.httpGet(this.url).pipe(
      map((x) => {
        const routinesCsv = this.importDataFromCSV(x, CsvRoutine);
        this.items = routinesCsv;
        return routinesCsv;
      })
    );
  }

  public getRoutine(
    isEvening: boolean,
    date: Date
  ): Observable<CsvRoutine | undefined> {
    return this.getAll().pipe(
      map((routines) => {
        return routines?.find((routine) => {
          return (
            routine.day ===
              date.toLocaleDateString('de-DE', { weekday: 'long' }) &&
            (isEvening
              ? routine.daytime == 'abends'
              : routine.daytime == 'morgens')
          );
        });
      })
    );
  }

  public getByBase(label: string): Observable<CsvRoutine[] | undefined> {
    return of(this.items?.filter((x) => x.base === label));
  }
}

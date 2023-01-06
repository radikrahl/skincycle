import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseEntity } from 'src/app/models/base.model';

@Injectable()
export abstract class CsvService<T extends ICsvEntity> {
  protected abstract url: string;
  public abstract items?: T[];
  constructor(private httpClient: HttpClient) {}

  public httpGet(url: string): Observable<string> {
    return this.httpClient.get(url, {
      responseType: 'text',
    });
  }

  public abstract getAll(): Observable<T[]>;

  public importDataFromCSV(
    csvText: string,
    type: { new (row: string): T }
  ): Array<T> {
    const dataRows = csvText.slice(csvText.indexOf('\r\n') + 2).split('\r\n');
    const dataArray: Array<T> = [];
    dataRows.forEach((row) => {
      dataArray.push(new type(row.trim()));
    });
    return dataArray;
  }
}

export type ICsvEntity = BaseEntity;

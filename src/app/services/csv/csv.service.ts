import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseEntity } from 'src/app/models/base.model';

@Injectable()
export abstract class CsvService<T extends ICsvEntity> {
  public url: string;

  constructor(private httpClient: HttpClient, baseUrl = '../assets/data/') {
    this.url = baseUrl;
  }

  public httpGet(url: string): Observable<string> {
    return this.httpClient.get(url, {
      responseType: 'text',
    });
  }

  public abstract getAll(): Observable<T[]>;

  public importDataFromCSV<T>(
    csvText: string,
    type: { new (row: string): T }
  ): Array<T> {
    // const propertyNames = csvText.slice(0, csvText.indexOf('\n')).split(',');
    const dataRows = csvText.slice(csvText.indexOf('\n') + 1).split('\n');
    const dataArray: Array<T> = [];
    dataRows.forEach((row) => {
      dataArray.push(new type(row));
    });
    return dataArray;
  }
}

export type ICsvEntity = BaseEntity

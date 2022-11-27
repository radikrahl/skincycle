import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'sc-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  products: Product[] = [];
  constructor(private httpClient: HttpClient) {
    this.getData().subscribe(product => {
      this.products = this.importDataFromCSV(product);
    })
  }

  private getData() {
    var csv = this.httpClient.get("../assets/data/skincycle.csv", {responseType: "text"});

    return csv;
  }

  private importDataFromCSV(csvText: string): Array<Product>{
    const propertyNames = csvText.slice(0, csvText.indexOf('\n')).split(',');
    const dataRows = csvText.slice(csvText.indexOf('\n') +1).split('\n');

    let dataArray: Array<Product> = [];
    dataRows.forEach((row) => {


      dataArray.push(new Product(row));
    })
    return dataArray;
  }
}

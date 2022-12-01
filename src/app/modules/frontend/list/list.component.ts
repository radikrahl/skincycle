import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CsvProduct } from 'src/app/models/csv/csvModels';
import { Product } from 'src/app/models/product.model';
import { CsvService } from 'src/app/services/csv.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'sc-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  products: CsvProduct[] = [];

  private subscription: Subscription;
  constructor(private service: CsvService) {
    this.subscription = this.service
      .getAll()
      .subscribe({
        next: (x) => {
          return  (this.products = x);
        },
        complete: () => this.subscription.unsubscribe(),
      });
  }
}

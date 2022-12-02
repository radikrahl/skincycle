import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, Renderer2 } from '@angular/core';
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
  constructor(private service: CsvService, private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'theme-green-light');

    this.subscription = this.service
      .getAll()
      .subscribe({
        next: (x) => {
          return  (this.products = x);
        },
        complete: () => this.subscription.unsubscribe(),
      });
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'theme-green-light');
  }
}

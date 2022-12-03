import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CsvCategoriesService } from 'src/app/services/csv/csv.categories.service';
import { CsvProductsService } from 'src/app/services/csv/csv.products.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'sc-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnDestroy, OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  private subscription?: Subscription;
  private categoriesSubscription?: Subscription;
  constructor(
    private service: CsvProductsService,
    private categoriesService: CsvCategoriesService,
    private renderer: Renderer2
  ) {
    this.renderer.addClass(document.body, 'theme-green-light');
  }
  ngOnInit(): void {
    this.subscription = this.service.getAll().subscribe({
      next: (products) => {
        return (this.products = products);
      },
      complete: () => this.subscription?.unsubscribe(),
    });

    this.categoriesSubscription = this.categoriesService.getAll().subscribe({
      next: (categories) => {
        return (this.categories = categories);
      },
      complete: () => this.categoriesSubscription?.unsubscribe(),
    });
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'theme-green-light');
  }
}

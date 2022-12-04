import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoriesService } from 'src/app/services/categories.service';
import {
  HeaderOptions,
  HeaderTitleService,
} from 'src/app/services/header-title.service';
import { ProductsService } from 'src/app/services/products.service';
import { FrontendBaseComponent } from '../base.component';

@Component({
  selector: 'sc-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent
  extends FrontendBaseComponent
  implements OnDestroy, OnInit
{
  products: Product[] = [];
  categories: Category[] = [];

  protected override headerOptions: HeaderOptions = {
    title: 'Produktliste',
    iconClass: 'sc-icon-add',
  };
  private subscription?: Subscription;
  private categoriesSubscription?: Subscription;
  constructor(
    headerTitleService: HeaderTitleService,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private renderer: Renderer2
  ) {
    super(headerTitleService, new HeaderOptions('Produktliste', 'sc-icon-add'));
    this.renderer.addClass(document.body, 'theme-green-light');
  }

  ngOnInit(): void {
    this.subscription = this.productsService.getAll().subscribe({
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

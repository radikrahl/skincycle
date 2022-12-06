import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoriesService } from 'src/app/services/categories.service';
import {
  HeaderOptions,
  HeaderTitleService,
} from 'src/app/shared/services/header-title.service';
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
  public themeClass = 'theme-green-light';
  headerOptions: HeaderOptions = {
    title: 'Produktliste',
    iconClass: 'sc-icon-add',
  };

  products: Product[] = [];
  categories: Category[] = [];

  private subscription?: Subscription;
  private categoriesSubscription?: Subscription;
  constructor(
    headerTitleService: HeaderTitleService,
    renderer: Renderer2,
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {
    super(headerTitleService, renderer);
  }

  override ngOnInit(): void {
    super.ngOnInit();
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
}

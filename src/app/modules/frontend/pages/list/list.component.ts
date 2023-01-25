import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/products/models/product.model';
import {
  HeaderOptions,
  HeaderTitleService,
} from 'src/app/shared/services/header-title.service';
import { FrontendBaseComponent } from '../../base.component';
import { Store } from '@ngxs/store';
import { ProductsState } from '../../../../products/products.state';
import { GetAll } from '../../../../products/products.actions';

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
    callback: this.headerCallback,
  };

  products: Product[] = [];
  categories: Category[] = [];

  private subscription?: Subscription;
  private categoriesSubscription?: Subscription;
  constructor(
    headerTitleService: HeaderTitleService,
    renderer: Renderer2,
    private store: Store
  ) {
    super(headerTitleService, renderer);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.subscription = this.store.select(ProductsState.getProducts).subscribe({
      next: (products) => {
        return (this.products = products);
      },
      complete: () => this.subscription?.unsubscribe(),
    });

    this.categoriesSubscription = this.store
      .select(ProductsState.getCategories)
      .subscribe({
        next: (categories) => {
          return (this.categories = categories);
        },
        complete: () => this.categoriesSubscription?.unsubscribe(),
      });
  }

  filterByCategory(label: string) {
    this.products = this.store.selectSnapshot(
      ProductsState.getProductsByCategory(label)
    );
  }

  headerCallback() {
    const error = new Error('not implemented;');
    console.error('notimplemented', error);
    throw new Error('not implemented;');
  }
}

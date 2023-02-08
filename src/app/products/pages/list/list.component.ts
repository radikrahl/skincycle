import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/categories/models/category.model';
import { Product } from 'src/app/products/models/product.model';
import { Select, Store } from '@ngxs/store';
import { CategoriesState } from '../../../shared/categories/state/categories.state';
import { ProductsQueries } from '../../queries/products.queries';
import { FrontendBaseComponent } from 'src/app/core/components/base.component';
import { HeaderOptions } from 'src/app/layout/header/models/options.model';

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

  products$?: Observable<Product[]>;

  @Select(CategoriesState.entities())
  categories$?: Observable<Category[]>;

  constructor(
    store: Store,
    renderer: Renderer2,
  ) {
    super(store, renderer);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.products$ = this.store.select(ProductsQueries.getProducts);
  }

  filterByCategory(label: string) {
    this.products$ = this.store.select(
      ProductsQueries.getProductsByCategory(label)
    );
  }

  headerCallback() {
    const error = new Error('not implemented;');
    console.error('notimplemented', error);
    throw new Error('not implemented;');
  }
}

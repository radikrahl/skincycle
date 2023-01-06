import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'sc-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  public isOpen = false;
  @Input() product: Product = new Product();
  @Input() showCategory = false;
}

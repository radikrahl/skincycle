import { Component, Input, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'sc-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  public isOpen: boolean = false;
  @Input() product: Product = new Product();

  constructor() {}
}

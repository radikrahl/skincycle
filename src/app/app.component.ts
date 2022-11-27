import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Product } from './models/product.model';

@Component({
  selector: 'sc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'skincycle';
}

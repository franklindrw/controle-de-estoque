import { Component, Input } from '@angular/core';
import type { GetAllProductsRes } from 'src/app/models/interfaces/products/response/GetAllProductsRes';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: []
})
export class ProductsTableComponent {
  @Input() products: Array<GetAllProductsRes> = [];

  public productSelected!: GetAllProductsRes;
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductEvent } from 'src/app/models/enums/products/ProductEvent';
import type { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import type { GetAllProductsRes } from 'src/app/models/interfaces/products/response/GetAllProductsRes';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: [],
})
export class ProductsTableComponent {
  @Input() products: Array<GetAllProductsRes> = [];
  @Output() productEvent = new EventEmitter<EventAction>();

  public productSelected!: GetAllProductsRes;
  public addProductEvent = ProductEvent.ADD_PRODUCT_EVENT;
  public editProductEvent = ProductEvent.EDIT_PPRODUCT_EVENT;

  handleProductEvent(action: string, id?: string): void {
    if (action && action !== '') {
      const productEventData = id && id !== '' ? { action, id } : { action };
      this.productEvent.emit(productEventData);
    }
  }
}

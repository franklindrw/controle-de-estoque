import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import type { GetAllProductsRes } from 'src/app/models/interfaces/products/response/GetAllProductsRes';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {
  public productsDataEmitter$ = new BehaviorSubject<Array<GetAllProductsRes> | null>(null);
  public productsData: Array<GetAllProductsRes> = [];

  setProductsData(data: Array<GetAllProductsRes>): void {
    if (data) {
      this.productsDataEmitter$.next(data);
      this.getProductsData();
    }
  }

  getProductsData() {
    this.productsDataEmitter$
      .pipe(
        take(1), map((data) => data?.filter((product) => product.amount > 0))
      )
      .subscribe({
        next: (res) => {
          if (res) {
            this.productsData = res;
          }
        }
      });

    return this.productsData;
  }
}

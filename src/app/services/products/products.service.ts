import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProductRequest } from 'api/src/models/interfaces/product/CreateProductRequest';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { CreateProductResponse } from 'src/app/models/interfaces/products/response/CreateProductResponse';
import { DeleteProductResponse } from 'src/app/models/interfaces/products/response/DeleteProductResponse';
import type { GetAllProductsRes } from 'src/app/models/interfaces/products/response/GetAllProductsRes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient, private cookie: CookieService) { }

  private API_URL = environment.URL_BASE;
  private TOKEN = this.cookie.get(environment.AUTH_TOKEN);
  private httpOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.TOKEN}`
    }
  }

  getAllProducts(): Observable<Array<GetAllProductsRes>> {
    return this.http.get<Array<GetAllProductsRes>>(
      `${this.API_URL}/products`, this.httpOptions
    )
    .pipe(
      map((product) => product.filter((data) => data.amount > 0))
    );
  }

  createProduct(requestDatas: CreateProductRequest): Observable<CreateProductResponse> {
    return this.http.post<CreateProductResponse>(
      `${this.API_URL}/product`,
      requestDatas,
      this.httpOptions,
    )
  }

  deleteProduct(product_id: string): Observable<DeleteProductResponse> {
    return this.http.delete<DeleteProductResponse>(`${this.API_URL}/product/delete`, {
      ...this.httpOptions,
      params: {
        product_id: product_id
      }
    })
  }
}

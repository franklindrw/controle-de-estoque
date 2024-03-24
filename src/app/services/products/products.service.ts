import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
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
}

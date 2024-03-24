import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import type { GetAllProductsRes } from 'src/app/models/interfaces/products/response/GetAllProductsRes';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: []
})
export class DashboardHomeComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private productsDataTransferService: ProductsDataTransferService
  ) {}

  public productList: Array<GetAllProductsRes> = [];
  TOAST_TIMEOUT = 1000 * 3; // 3 segundos

  ngOnInit(): void {
    this.getProductsDatas();
  }

  getProductsDatas(): void {
    this.productsService
      .getAllProducts()
      .subscribe({
        next: (res) => {
          if (res.length > 0) {
            this.productList = res;
            this.productsDataTransferService.setProductsData(this.productList);
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Erro ao buscar os produtos.',
            life: this.TOAST_TIMEOUT
          });
          console.error(err);
        }
      });
  }
}

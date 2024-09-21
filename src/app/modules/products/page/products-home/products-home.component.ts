import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import type { GetAllProductsRes } from 'src/app/models/interfaces/products/response/GetAllProductsRes';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
})
export class ProductsHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public productsData: Array<GetAllProductsRes> = [];

  constructor(
    private productsService: ProductsService,
    private productsDtService: ProductsDataTransferService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getServiceProductsDatas();
  }

  getServiceProductsDatas(): void {
    const productsLoaded = this.productsDtService.getProductsData();

    if (productsLoaded.length > 0) {
      this.productsData = productsLoaded;
    } else this.getAPIProductsDatas();
  }

  getAPIProductsDatas() {
    this.productsService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data.length > 0) {
            this.productsData = data;
            console.log(data);
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar produtos',
            life: 2500,
          });
          this.router.navigate(['/dashboard'])
        },
      });
  }

  handleProductAction(event: EventAction): void {
    if(event) {
      console.log('dados do evento recebido', event);
    }
  }

  handleDeleteProductAction(event: {
    product_id: string,
    productName: string
  }): void {
    if(event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do produto ${event?.productName}?`,
        header: "Excluir Item",
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Excluir',
        rejectLabel: 'Cancelar',
        accept: () => this.deleteProduct(event?.product_id)
      })
    }
  }

  deleteProduct(product_id: string) {
    if(product_id) {
      this.productsService
        .deleteProduct(product_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Produto removido com sucesso!',
                life: 2500,
              });

              this.getAPIProductsDatas();
            }
          },
          error: (err) => {
            console.error(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: "Ocorreu um erro ao remover o item!"
            })
          }
        })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

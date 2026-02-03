import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Product } from '../models/product';
import { ApiService } from '../api/api-service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private apiService = inject(ApiService)
  private products = signal<Product[]>([])

  private loadProducts(): void {
    this.apiService.loadProducts().subscribe(
      {
        next: (data) => {
          console.table(data)
          this.products.set(data)
        }
      }
    )
  }

  getProducts(): Signal<Product[]>  {
    this.loadProducts()
    return this.products.asReadonly();
  }

}

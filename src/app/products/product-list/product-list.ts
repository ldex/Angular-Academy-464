import { Component, inject, Signal, signal } from '@angular/core'
import { Product } from '../../models/product'
import { CurrencyPipe, UpperCasePipe } from '@angular/common'
import { ProductDetails } from "../product-details/product-details"
import { ProductService } from '../product-service'

@Component({
  selector: 'app-product-list',
  imports: [UpperCasePipe, CurrencyPipe, ProductDetails],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  productService = inject(ProductService)
  selectedProduct = signal<Product>(undefined)

  select(product: Product): void {
    this.selectedProduct.set(product)
  }

  title: Signal<string> = signal('Products')

  products: Signal<Product[]> = this.productService.getProducts()
}

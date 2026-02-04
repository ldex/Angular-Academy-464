import { Component, inject, Signal, signal } from '@angular/core'
import { Product } from '../../models/product'
import { CurrencyPipe, JsonPipe, SlicePipe, UpperCasePipe } from '@angular/common'
import { ProductService } from '../product-service'
import { OrderByPipe } from '../orderBy.pipe'
import { Router, RouterLink } from '@angular/router'

@Component({
  selector: 'app-product-list',
  imports: [SlicePipe, OrderByPipe, JsonPipe, UpperCasePipe, CurrencyPipe, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export default class ProductList {
  private productService = inject(ProductService)
  private router = inject(Router)

  protected selectedProduct = signal<Product>(undefined)
  protected isLoading = this.productService.isLoading
  protected errorMessage = this.productService.errorMessage

  protected pageSize = signal(5)
  protected start = signal(0)
  protected end = signal(this.pageSize())
  protected pageNumber = signal(1)

  protected changePage(increment: number) {
    this.pageNumber.update(p => p + increment)
    this.start.update(n => n + increment * this.pageSize())
    this.end.set(this.start() + this.pageSize())
    this.selectedProduct.set(undefined)
  }

  protected select(product: Product): void {
    this.router.navigate(['/products', product.id])
  }

  protected title: Signal<string> = signal('Products')

  protected products: Signal<Product[]> = this.productService.getProducts()
}

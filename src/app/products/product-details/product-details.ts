import { Component, inject, input, InputSignal, OnInit, Signal } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { ProductService } from '../product-service';

@Component({
  selector: 'app-product-details',
  imports: [UpperCasePipe, CurrencyPipe, DatePipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {

  private productService = inject(ProductService)
  id = input.required<number>()

  product: Signal<Product>

  ngOnInit() {
    this.product = this.productService.getProductById(this.id())
  }

  deleteProduct() {
    this.productService.deleteProduct(this.id())
  }

}

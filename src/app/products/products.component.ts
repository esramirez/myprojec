import { Component, OnInit } from '@angular/core';
import { ProductService } from './shared/product.service';
import { Product } from './shared/products.model';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  //public allProducts = products;
  products: Product[];
  errorMessage: string;

  constructor(private productService: ProductService) { 
   }

  getProducts(): void {
    this.productService.list()
        .subscribe(productData => this.products = productData),
        error => (this.errorMessage = error)
  }

  ngOnInit() {
    this.getProducts();
 
  }

}

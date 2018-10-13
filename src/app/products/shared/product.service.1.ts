import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { PRODUCTS } from './mock-products';
import { Product } from './products.model';
import { MessageService } from '../../message.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = "http://spreadsheets.google.com/feeds/list/1BkpC8T03QCa1rs_9nZmpWbvMGYvAfhN-S4U6sDiuanU/1/public/values?alt=json";
  
  constructor(private messageService: MessageService, private http: HttpClient) { }
  list(): Observable<Product[]>{
    return this.http.get(this.productsUrl).pipe(
      map(this.filterData));
     
    }
    
    filterData(data: any): Product[] {
      //console.log('product.service: data\n' + JSON.stringify(data['feed']['entry']) + '\n\n');
      const results = data['feed']['entry'];
      console.log('BambooService: FilterBuilds data\n' + JSON.stringify(results[0]['gsx$name']['$t']) + '\n\n');
      const productSeries: Product = new Product();
      results.forEach((result) => {
        console.log('result data\n' + JSON.stringify(result['gsx$name']['$t']) + '\n\n');
        productSeries.name=JSON.stringify(result['gsx$name']['$t']);
        productSeries.description =JSON.stringify(result['gsx$description']['$t']);
        productSeries.imageUrl=JSON.stringify(result['gsx$imageurl']['$t']);
        
  
      });
  
      return [productSeries];
    }
      
}

 


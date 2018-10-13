import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { PRODUCTS } from './mock-products';
import { Product } from './products.model';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = "http://spreadsheets.google.com/feeds/list/1BkpC8T03QCa1rs_9nZmpWbvMGYvAfhN-S4U6sDiuanU/1/public/values?alt=json";

  constructor(private http: HttpClient, 
              private sanitizer: DomSanitizer) { }

  list(): Observable<Product[]>{
    return this.http.get(this.productsUrl).pipe(
      map((data)=>{return this.filterData(data);}));
     
    }
    
    filterData(data: any ): Product[] {
      let returnArray = new Array<Product>();
      
      //console.log('product.service: data\n' + JSON.stringify(data['feed']['entry']) + '\n\n');
      const results = data['feed']['entry'];
     // console.log('BambooService: FilterBuilds data\n' + JSON.stringify(results[0]['gsx$name']['$t']) + '\n\n');
      
      results.forEach((result) => {
        var productSeries = new Product();
        console.log('result data\n' + JSON.stringify(result['gsx$name']['$t']) + '\n\n');
        
        
        productSeries['name']=JSON.stringify(result['gsx$name']['$t']);
        var description = JSON.stringify(result['gsx$description']['$t'])
        if (description.length > 50){
          description = description.substr(0, 50) + "..."
        }
        productSeries['description'] =description;
        var formattedUrl = JSON.stringify(result['gsx$imageurl']['$t']).replace('"', '');
        formattedUrl = formattedUrl.replace('"', '');
        console.log(formattedUrl)
        var safeUrl = this.sanitizer.bypassSecurityTrustUrl(formattedUrl);
        productSeries['imageUrl']=safeUrl; //(JSON.stringify(result['gsx$imageurl']['$t']));
        returnArray.push(productSeries);
        console.log("<<<<<<<<<<<<<<<<<<<<<" )
        console.log(productSeries['imageUrl'])
        console.log(">>>>>>>>>>>>>>>" )
        console.log(returnArray)
        console.log("<<<<<<<<<<<<<<<<<")
       
      });
      
      return returnArray;
    }
      
}

 


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
  private productsUrl = "https://spreadsheets.google.com/feeds/list/1BkpC8T03QCa1rs_9nZmpWbvMGYvAfhN-S4U6sDiuanU/1/public/values?alt=json";

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
        //console.log('result data\n' + JSON.stringify(result['gsx$name']['$t']) + '\n\n');
        
        
        productSeries['name']=JSON.stringify(result['gsx$name']['$t']).replace(/^"(.+(?="$))"$/, '$1');
        var description = JSON.stringify(result['gsx$description']['$t']).replace(/^"(.+(?="$))"$/, '$1');
        if (description.length > 50){
          description = description.substr(0, 100) + "..."
        }
        productSeries['description'] =description;
        var formattedUrl = JSON.stringify(result['gsx$imageurl']['$t']).replace(/^"(.+(?="$))"$/, '$1');

          //this is for the product post url
        var formattedPostUrl = JSON.stringify(result['gsx$posturl']['$t']).replace(/^"(.+(?="$))"$/, '$1');
     
        // console.log("<<<<<<<<<<<<<<<<<<<<<" )
        // console.log("<<<<<<<<<<<<<<<<<<<<<" )
        // console.log(JSON.stringify(result['gsx$posturl']['$t']))
        // console.log("<<<<<<<<<<<<<<<<<<<<<" )
        // console.log("<<<<<<<<<<<<<<<<<<<<<" )
        var safeUrl = this.sanitizer.bypassSecurityTrustUrl(formattedUrl);
        var safePostUrl = this.sanitizer.bypassSecurityTrustUrl(formattedPostUrl);
        productSeries['imageUrl']=safeUrl;
        productSeries['postUrl']=safePostUrl;
        returnArray.push(productSeries);
        // console.log("<<<<<<<<<<<<<<<<<<<<<" )
        // console.log(productSeries['imageUrl'])
        // console.log(">>>>>>>>>>>>>>>" )
        // console.log(returnArray)
        // console.log("<<<<<<<<<<<<<<<<<")
       
      });
      
      return returnArray;
    }
      
}

 


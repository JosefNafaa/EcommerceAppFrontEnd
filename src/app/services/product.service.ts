import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl=  'http://localhost:8080/api/products';
  private categoryUrl= 'http://localhost:8080/api/product-category';

  constructor(private httpClient :HttpClient) { }


  getProductDetails(productId:number) : Observable<Product>{
      // need to build URL based on product id
      const productUrl = `${this.baseUrl}/${productId}`;
      return this.httpClient.get<Product>(productUrl);
  }
  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }



  getProductListPaginate(thePage: number, thePageSize: number,  theCategoryId: number): Observable<GetResponse> {

                // need to build URL based on category id, page and size
                const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` + `&page=${thePage}&size=${thePageSize}`;
                return this.httpClient.get<GetResponse>(searchUrl);
}

  searchProduct(keyword : string) :Observable<Product[]>{
   // need to build URL based on keyword
  const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
   return this.httpClient.get<GetResponse>(searchUrl).pipe(
    map(response => response._embedded.products)
   );
  }


  searchProductsPaginate(thePage: number,
    thePageSize: number,
    theKeyword: string): Observable<GetResponse> {

// need to build URL based on keyword, page and size
const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
+ `&page=${thePage}&size=${thePageSize}`;

return this.httpClient.get<GetResponse>(searchUrl);
}

 getProductCategories(): Observable<ProductCategory[]> {

     return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
       map(response => response._embedded.productCategory)
     );
   }

 }


interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
interface GetResponse {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }


}

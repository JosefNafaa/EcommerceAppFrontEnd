import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

   products : Product[]=[];
   currentCategoryId :number=1;
   hasKeyword:boolean =false;


  constructor(private productService : ProductService,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.listProduct();
   });

  }

  searchProductList() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

      this.productService.searchProduct(theKeyword).subscribe( data=>{

         this.products=data;
    });
  }

  handleListProduct(){
       // check if "id" parameter is available
       const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

       if (hasCategoryId) {
         // get the "id" param string. convert string to a number using the "+" symbol
         this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
       }
       else {
         // not category id available ... default to category id 1
         this.currentCategoryId = 1;
       }

       this.productService.getProductList(this.currentCategoryId).subscribe(
         data=>{
           this.products=data;

         }
       );
  }

  listProduct(){
    this.hasKeyword=this.route.snapshot.paramMap.has('keyword');
    if(this.hasKeyword){
      this.searchProductList();
    }
    else{
      this.handleListProduct();
    }

  }

}

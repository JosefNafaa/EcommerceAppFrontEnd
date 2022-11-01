import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();
  currentProductId :number=1;
  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails(){
    this.currentProductId= +this.route.snapshot.paramMap.get('id')!
    this.productService.getProductDetails(this.currentProductId).subscribe(
      data=>{
        this.product=data;

      }
    );
  }

}

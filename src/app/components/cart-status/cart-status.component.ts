import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice : number =0.00;
  totalQuabtity :number =0;
  constructor(private cartServce :CartService)
  {

  }

  ngOnInit(): void {
    this.updateCart();
  }

 updateCart() :void{
  this.cartServce.totalPrice.subscribe(data=>{
    this.totalPrice=data;
  });
  this.cartServce.totalQuantity.subscribe(
    data=>{
      this.totalQuabtity=data;
    }
  )

 }

}

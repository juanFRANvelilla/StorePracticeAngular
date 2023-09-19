import { Component,OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  constructor(private cartService:ShoppingCartService){}
  ngOnInit(): void {
    this.cart$.subscribe(cart => {
      console.log('product list: ', cart)
    })
  }

  total$ = this.cartService.totalAction$;
  cart$ = this.cartService.cartAction$;

}

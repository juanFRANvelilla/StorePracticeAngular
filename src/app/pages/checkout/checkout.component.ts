import { Component, OnInit } from '@angular/core';
import { StoresService } from '../stores/services/stores.service';
import { Store } from '../stores/interfaces/store.interface';
import { Observable, map, tap } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';
import { Order } from './interfaces/order.class';
import { DetailsOrderService } from 'src/app/shared/services/details-order.service';
import { DetailsOrders } from './interfaces/detailsOrders.class';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from '../products/interfaces/product.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(private storesService: StoresService, 
    private orderService: OrderService,
    private detailsOrderService: DetailsOrderService,
    private cartService:ShoppingCartService) {}

  isPickup!: boolean;
  private getCurrencyDate(){
    return new Date().toLocaleDateString();
  }

  model = {
    id: 0,
    name: '',
    date: this.getCurrencyDate(),
    store: '',
    shippingAddress: '',
    city: '',
    pickup: false
  };
  stores: Store[] = [];
  ngOnInit() {
    this.isPickup = false;
    this.storesService.getStores()
      .pipe(
        tap((stores: Store[]) => {
          this.stores = stores;
        })
      )
      .subscribe();
  }

  pickupOrDelivery(value: boolean): void {
    this.isPickup = value;
    this.model.pickup = value;
  }

  onSubmit(){
    let orderId$ = this.postOrder();
    console.log('order add')
    this.postDetailsOrder(orderId$);
    
  }

  private createDetailsOrder(orderId:number, detailsOrderId:number): DetailsOrders[]{
    let detailsOrders: DetailsOrders[] = [];
    this.cartService.cartAction$.subscribe((products:Product[]) => {
      products.forEach((product:Product) => {
        const detailsOrder = new DetailsOrders(
          detailsOrderId,
          orderId,
          product.quantity,
          product.name
        )
        detailsOrders.push(detailsOrder);
        detailsOrderId++;
      })
    })
    return detailsOrders;
  }

  private postDetailsOrder(orderId$: Observable<number>): void{
    let detailsOrderId: number;
    this.detailsOrderService.getDetailsOrders().pipe(
      map((detailsOrders:DetailsOrders[]) => {
        detailsOrderId = detailsOrders.length+1;
        orderId$.subscribe((orderId: number) =>{
          let detailsOrderAdd: DetailsOrders[] = this.createDetailsOrder(orderId, detailsOrderId);
          detailsOrderAdd.forEach((detailsOrder:DetailsOrders) => {
            this.detailsOrderService.postDetailsOrder(detailsOrder).pipe(
              tap(res => console.log(res))
            )
            .subscribe();
          })
        })
      })
    ).subscribe();
  }

  private createOrder(orderId :number):Order{
    const order = new Order(
      orderId,
      this.model.name,
      this.model.date,
      this.model.store,
      this.model.shippingAddress,
      this.model.city,
      this.model.pickup
    );
    return order;
  }
  
  private postOrder(): Observable<number> {
    return this.orderService.getOrders()
      .pipe(
        map((orders: Order[]) => {
          const orderId = orders.length + 1;
          const newOrder = this.createOrder(orderId);
          this.orderService.putOrder(newOrder)
            .pipe(
              tap(res => console.log(res))
            )
            .subscribe();
            console.log('id de la order: ' + orderId)
          return orderId;
        })
      );
  }
  

}

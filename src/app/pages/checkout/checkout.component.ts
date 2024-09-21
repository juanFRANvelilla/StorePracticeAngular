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
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  [x: string]: any;
  constructor(private storesService: StoresService, 
    private orderService: OrderService,
    private detailsOrderService: DetailsOrderService,
    private cartService:ShoppingCartService,
    private router: Router) {}

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
    //guardas el nuevo order y obtienes su id
    let orderId$ = this.postOrder();
    console.log('order add')
    //guardas el nuevo detalle
    this.postDetailsOrder(orderId$);
    
  }

  //creas una lista de detalles para cada producto con su cantidad, y el id de la order
  private createDetailsOrder(orderId:number, detailsOrderId:number): DetailsOrders[]{
    let detailsOrders: DetailsOrders[] = [];
    //obtiene la lista de productos
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
        //obtiene el id que corresponde para un nuevo detalle
        detailsOrderId = detailsOrders.length+1;
        orderId$.subscribe((orderId: number) =>{
          //llama a la funcion que crea una lista de detalles
          let detailsOrderAdd: DetailsOrders[] = this.createDetailsOrder(orderId, detailsOrderId);
          detailsOrderAdd.forEach((detailsOrder:DetailsOrders) => {
            //guarda el nuevo detalle
            this.detailsOrderService.postDetailsOrder(detailsOrder).pipe(
              tap(res => {
                console.log('detalle guardado', res);
                this.router.navigate(['/products']);
                this.cartService.deleteCart();
                //falta vaciar carrito
              })
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
          //retorna el id del order que se necesita
          const orderId = orders.length + 1;
          // crea el nuevo order
          const newOrder = this.createOrder(orderId);
          //postea el nuevo order
          //devuelve el order guardado como un observable, entonces 
          //puedes hacer .pipe para jugar con el observable y modificarlo
          //despues con .suscribe vas a ver el valor actual del observable
          //sin poder utilizarlo
          this.orderService.putOrder(newOrder)
            .pipe(
              tap(res => {
                console.log('Id sin sumar: ', res.id)
                //sumamos el id para prueba
                res.id++
              })
            )
            .subscribe(data => {
              console.log('Id sumado: ', data.id)
            });

            // this.orderService.putOrder(newOrder)
            //   .subscribe(data => {
            //     console.log('Order guardado: ', data)
            //   });
            
          return orderId;
        })
      );
  }
  

}

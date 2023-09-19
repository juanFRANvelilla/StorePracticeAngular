import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/pages/checkout/interfaces/order.class';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000/orders';
  putOrder(order: Order): Observable<Order>{
    return this.http.put<Order>(this.apiUrl, order);
  }

  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>(this.apiUrl);
  }
}

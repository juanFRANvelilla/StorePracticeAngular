import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailsOrders } from 'src/app/pages/checkout/interfaces/detailsOrders.class';

@Injectable({
  providedIn: 'root'
})
export class DetailsOrderService {

  constructor(private http: HttpClient) { }
  private apiUrl = "http://localhost:3000/detailsOrders"
  getDetailsOrders(): Observable<DetailsOrders[]>{
    return this.http.get<DetailsOrders[]>(this.apiUrl)
  }

  postDetailsOrder(detailsOrde : DetailsOrders): Observable<DetailsOrders>{
    return this.http.post<DetailsOrders>(this.apiUrl, detailsOrde)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '../interfaces/store.interface';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000/stores';
  getStores():Observable<any>{
    return this.http.get<Store[]>(this.apiUrl);
  }
}

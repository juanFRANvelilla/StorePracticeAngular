import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Store } from '../interfaces/store.interface';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  
  private apiUrl = 'http://localhost:3000/stores';
  /*getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.apiUrl).pipe(
      catchError((error: any) => {
        console.error('Error en la solicitud HTTP:', error);
        throw error; 
      })
    );
  }*/
  constructor(private http: HttpClient) { }
  
  getStores():Observable<any>{
    return this.http.get<Store[]>(this.apiUrl);
  }
}

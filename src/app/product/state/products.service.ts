import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { filter, map, tap } from 'rxjs/operators';
import { Product } from './product.model';
import { ProductsStore } from './products.store';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  
  private serverUrl = 'http://localhost:3000/';

  constructor(private productsStore: ProductsStore, private http: HttpClient) {
  }

  private buildHeader() {
    const token: string | null = localStorage.getItem('token');
    if(token===null) throw 'no token found';
    return new HttpHeaders({Authorization: token});
  }
  
  get() {
    return this.http.get<{products:any[]}>(this.serverUrl+'api/product', { headers: this.buildHeader() }).pipe(
      map(Response => {
        return Response['products'];
      }),
      tap(entities => {
        this.productsStore.set(entities);
      })
    ).subscribe();
  }

  add(product: Product) {
    return this.http.post<{product: Product}>(this.serverUrl+'api/product', product, { headers: this.buildHeader() }).pipe(
      map(Response => {
        return Response['product'];
      }),
      tap(entity => {
        this.productsStore.add(entity);
      })
    ).subscribe();
  }

  update(id: ID, product: Partial<Product>) {
    return this.http.put<{message: string}>(this.serverUrl+'api/product/'+id, product, { headers: this.buildHeader() }).pipe(
      map(Response => {
        return Response['message'];
      }),
      filter(res => res === 'Modified!'),
      tap(res => {
        //console.log(res)
        this.productsStore.update(id, product);
      })
    ).subscribe();
  }

  /*
  update(id: ID, product: Partial<Product>) {
    return this.http.put<{message: string}>(this.serverUrl+'api/product/'+id, product, { headers: this.buildHeader() }).subscribe(
      (res) => {
        if(res['message'] === 'Modified!') this.productsStore.update(id, product);
      }
    );
  }
  */

  remove(id: ID) {
    return this.http.delete<{message: string}>(this.serverUrl+'api/product/'+id, { headers: this.buildHeader() }).subscribe(
      (res) => {
        if(res['message'] === 'Deleted!' ) this.productsStore.remove(id);
      }
    );
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { map, tap } from 'rxjs/operators';
import { Product } from './product.model';
import { ProductsStore } from './products.store';

@Injectable({ providedIn: 'root' })
export class ProductsService {

  constructor(private productsStore: ProductsStore, private http: HttpClient) {
  }

  private buildHeader() {
    const token: string | null = localStorage.getItem('token');
    if(token===null) throw 'no token found';
    return new HttpHeaders({Authorization: token});
  }
  
  get() {
    return this.http.get<{products:any[]}>('http://localhost:3000/api/product', { headers: this.buildHeader() }).pipe(
      map(Response => {
        return Response['products'];
      }),
      tap(entities => {
        this.productsStore.set(entities);
      })
    );
  }

  add(product: Product) {
    this.productsStore.add(product);
  }

  update(id: ID, product: Partial<Product>) {
    this.productsStore.update(id, product);
  }

  remove(id: ID) {
    this.productsStore.remove(id);
  }

}

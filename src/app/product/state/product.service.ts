import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, map } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnDestroy {
  //productsSubject = new Subject<any[]>();
  //productsSubscription = new Subscription;

  //private list = new Array();
  /* private list = [
      {id:'1',name:'produit 1',price:10},
      {id:'2',name:'produit 2',price:20},
      {id:'3',name:'produit 3',price:30}
  ]; */

  private serverUrl = 'http://localhost:3000/';
  
  constructor(private httpClient: HttpClient) {};

  private buildHeader() {
    const token: string | null = localStorage.getItem('token');
    if(token===null) throw 'no token found';
    return new HttpHeaders({Authorization: token});
  }

  saveListToServer() { /*
    const header = this.buildHeader();
    for(let i=0; i < this.list.length; i++){ // tester si _id : modifier (put) à l'adresse api/product/:id ; sinon ajouter (post) à l'adresse api/product
      //console.log('list[i]: ', this.list[i]);
      this.httpClient.put('http://localhost:3000/api/product', this.list[i], { headers: header, params: this.list[i]._id }).subscribe();
    } */
  }

  getListFromServer() : Observable<any[]> {
    return this.httpClient.get<{products:any[]}>(this.serverUrl+'api/product', { headers: this.buildHeader() })
    .pipe(
      map(Response => {
        return Response['products'];
      })
    );
  }

  addProduct(product: Product) {
    return this.httpClient.post<{product: Product}>(this.serverUrl+'api/product', product, { headers: this.buildHeader() })
    .pipe(
      map(Response => {
        return Response['product'];
      })
    );
  }

  /* addProduct(name: string, price: number) {
    var productObject = new Product;
    productObject.name = name;
    productObject.price = price;
    this.list.push(productObject);
    this.emitProductsSubject();
  } */

  getProductById(id: string) {
    return this.httpClient.get<{product:Product}>(this.serverUrl+'api/product/'+id, { headers: this.buildHeader() })
    .pipe(
      map(Response => {
        //console.log('product: ', Response['product']);
        return Response['product'];
      })
    );
    /* const product = this.list.find((s) => { return s.id === id; });
    return product?product:Product; */
  }

  modifyProduct(id: string, product: Product) {
    return this.httpClient.put(this.serverUrl+'api/product/'+id, product, { headers: this.buildHeader() });
  }

  deleteProduct(id: string) {
    return this.httpClient.delete(this.serverUrl+'api/product/'+id, { headers: this.buildHeader() });
  }

  /* emitProductsSubject() {
    this.productsSubject.next(this.list.slice());
  } */

  ngOnDestroy(): void {
    //this.productsSubscription.unsubscribe();
  }

}

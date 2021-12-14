import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../state/product.model';
import { ProductService } from '../state/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  //list = new Array();
  //productSubject = this.productService.productsSubject;
  //listSubscription = new Subscription;
  products : Observable<any[]> = this.productService.getListFromServer();

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    //this.productService.getListFromServer();
    //this.listSubscription = this.productSubject.subscribe((products) => this.list = products);
  }

  onClick() {
    this.router.navigate(['new']);
  }

  onSave() {
    this.productService.saveListToServer();
  }

  onFetch() {
    this.products = this.productService.getListFromServer();
  }

  ngOnDestroy(): void {
    this.productService.saveListToServer();
    //this.listSubscription.unsubscribe();
  }

}

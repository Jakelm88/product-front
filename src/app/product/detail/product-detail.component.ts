import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../state/product.model';
import { ProductService } from '../state/product.service';
import { ProductsQuery } from '../state/products.query';
import { ProductsService } from '../state/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: any;
  productSub = new Subscription();
  
  constructor(private productService : ProductsService, private productsQuery: ProductsQuery,
    private router: Router, private route : ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.productSub = this.productsQuery.selectEntity(id).subscribe(res => { this.product = res });
    /*this.productSub = this.productService.getProductById(id).subscribe(res => {
      this.product = {...this.product, ...res};
      //console.log('produit : ', this.product);
    });*/
    console.log('produit : ', this.product);
  }

  onModify() {
    this.router.navigate(['/item/edit', this.product._id]);
  }

  onDelete() {
    if(confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')){
      //this.productService.deleteProduct(this.product._id).subscribe();
      this.productService.remove(this.product._id);
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

}

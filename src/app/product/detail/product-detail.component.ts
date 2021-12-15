import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../state/product.model';
import { ProductService } from '../state/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product = Product();
  productSub = new Subscription();
  
  constructor(private productService : ProductService, private router: Router, private route : ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.productSub = this.productService.getProductById(id).subscribe(res => {
      this.product = {...this.product, ...res};
      //console.log('produit : ', this.product);
    });
  }

  onModify() {
    this.router.navigate(['/item/edit', this.product._id]);
  }

  onDelete() {
    if(confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')){
      this.productService.deleteProduct(this.product._id).subscribe();
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

}

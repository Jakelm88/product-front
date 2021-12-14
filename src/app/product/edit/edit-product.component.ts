import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../state/product.model';
import { ProductService } from '../state/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, OnDestroy {
  @Input() name: string;
  @Input() description: string;
  @Input() price: number;
  @Input() inStock: boolean;

  product = Product();
  id = this.route.snapshot.params['id'];
  productSub = this.productService.getProductById(this.id)
    .subscribe(res => { this.product = res; });

  constructor ( private productService : ProductService,
    private router : Router, private route : ActivatedRoute ){
      let tmp = Product();
      tmp = { ...this.product };
      this.name = tmp.name;
      this.description = tmp.description?tmp.description:'';
      this.price = tmp.price;
      this.inStock = tmp.inStock?tmp.inStock:false;
  }

  ngOnInit(): void {}

  onSubmit() {
    // On peut vérifier que l'utilisateur a le droit de le faire, le serveur devra aussi verifier
    this.productService.modifyProduct(this.product._id, this.product).subscribe();
    this.router.navigate(['/item', this.product._id]);
  }

  onCancel(){
    this.router.navigate(['/item', this.product._id]);
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

}

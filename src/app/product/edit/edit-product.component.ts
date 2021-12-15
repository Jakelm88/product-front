import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../state/product.model';
import { ProductService } from '../state/product.service';
import { ProductsQuery } from '../state/products.query';
import { ProductsService } from '../state/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, OnDestroy {
  form: FormGroup;
  error = '';

  id = this.route.snapshot.params['id'];
  product = this.productsQuery.getEntity(this.id);

  constructor ( private productService : ProductsService, private productsQuery : ProductsQuery,
    private router : Router, private route : ActivatedRoute,
    private formBuilder: FormBuilder ){
      this.form = this.formBuilder.group({
        name : [this.product?.name, Validators.required],
        description : this.product?.description,
        price : [this.product?.price, Validators.required],
        inStock : this.product?.inStock? 'true' : 'false'
      });
  }

  ngOnInit(): void {}

  onSubmit() {
    let value = this.form.value;
    console.log('form.value : ', value);
    let product;
    
    // gestion des propriétés facultatives, prix négatif, erreurs
    if(value['name'] === '') return this.error = 'name';
    if(value['price'] < 0) return this.error = 'price';
    if(value['description'] === this.product?.description || value['description'] === null) delete value.description;
    if(value['inStock'] != 'true') delete value.inStock; else { delete value.inStock; value.inStock = true; }

    product = { ...value };
    console.log('essaye de modifier avec : ', product);

    // On peut vérifier que l'utilisateur a le droit de le faire, le serveur devra aussi verifier
    //this.productService.modifyProduct(this.product._id, this.product).subscribe();
    this.productService.update(this.id, product);
    this.router.navigate(['/item', this.id]);
    return 'ok';
  }

  onCancel(){
    this.router.navigate(['/item', this.id]);
  }

  ngOnDestroy(): void {
    //this.productSub.unsubscribe();
  }

}

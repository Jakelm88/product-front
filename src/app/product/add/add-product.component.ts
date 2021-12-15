import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../state/product.model';
import { ProductService } from '../state/product.service';
import { ProductsService } from '../state/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  form: FormGroup;
  error = '';

  constructor( private productService: ProductsService, private router: Router,
    private formBuilder: FormBuilder ){
    this.form = this.formBuilder.group({
      name : ['', Validators.required],
      description : 'Pas de description',
      price : [0, Validators.required],
      inStock : 'false'
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    let value = this.form.value;
    let product;
    
    // gestion des propriétés facultatives, prix négatif, erreurs
    if(value['name'] === '') return this.error = 'name';
    if(value['price'] < 0) return this.error = 'price';
    if(value['description'] === 'Pas de description' || value['description'] === '') delete value.description;
    if(value['inStock'] != 'true') delete value.inStock; else { delete value.inStock; value.inStock = true; }

    product = { ...value };
    console.log('essaye d\'ajouter le produit : ', product);

    //this.productService.addProduct(product).subscribe();
    this.productService.add(product);
    this.router.navigate(['..']);
    return 'ok';
  }

  onCancel() {
    this.router.navigate(['..']);
  }

}

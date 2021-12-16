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

  // Methodes get comme raccourci vers les controles du formulaire (utilisées dans le template par les *ngIf des validators)
  get name(): any { return this.form.get('name'); }
  get price(): any { return this.form.get('price'); }

  constructor( private productService: ProductsService, private router: Router,
    private formBuilder: FormBuilder ){
    this.form = this.formBuilder.group({
      name : [null, [ Validators.required, Validators.minLength(4) ]],
      description : null,
      price : [0, [ Validators.required, Validators.min(0) ]],
      inStock : 'false'
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    let value = this.form.value;
    let product;
    
    // gestion des propriétés facultatives
    if(value['description'] === null || value['description'] === '') delete value.description;
    if(value['inStock'] != 'true') delete value.inStock; else { delete value.inStock; value.inStock = true; }

    product = { ...value };
    console.log('essaye d\'ajouter le produit : ', product);

    //this.productService.addProduct(product).subscribe();
    this.productService.add(product);
    this.router.navigate(['..']);
  }

  onCancel() {
    this.router.navigate(['..']);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  form: FormGroup;

  constructor( private productService: ProductService, private router: Router,
    private formBuilder: FormBuilder ){
    this.form = this.formBuilder.group({
      name : ['', Validators.required],
      description : 'Pas de description',
      price : [0, Validators.required],
      inStock : false
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    let product = new Product();
    product.name=this.form.value['name'];
    product.price=this.form.value['price'];
    // if description != 'Pas de description'
    // if inStock === true
    //console.log('essaye d\'envoyer le produit : ', product);
    this.productService.addProduct(product).subscribe();
    this.router.navigate(['..']);
  }

  onCancel() {
    this.router.navigate(['..']);
  }

}

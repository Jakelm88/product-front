import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';
import { ProductListComponent } from './list/product-list.component';
import { ProductPreviewComponent } from './preview/product-preview.component';
import { ProductDetailComponent } from './detail/product-detail.component';
import { EditProductComponent } from './edit/edit-product.component';
import { AddProductComponent } from './add/add-product.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductPreviewComponent,
    ProductDetailComponent,
    EditProductComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductListComponent
  ]
})
export class ProductModule { }

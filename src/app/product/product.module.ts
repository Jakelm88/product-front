import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
    ReactiveFormsModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    ProductListComponent
  ]
})
export class ProductModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product/list/product-list.component';
import { ProductPreviewComponent } from './product/preview/product-preview.component';
import { ProductService } from './product/state/product.service';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/state/auth.service';
import { ProductDetailComponent } from './product/detail/product-detail.component';
import { EditProductComponent } from './product/edit/edit-product.component';
import { AuthGuard } from './auth/state/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './product/add/add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductPreviewComponent,
    LoginComponent,
    ProductDetailComponent,
    EditProductComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ProductService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

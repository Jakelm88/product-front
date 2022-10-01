import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/state/auth-guard.service';
import { AddProductComponent } from './product/add/add-product.component';
import { EditProductComponent } from './product/edit/edit-product.component';
import { ProductDetailComponent } from './product/detail/product-detail.component';
import { ProductListComponent } from './product/list/product-list.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'new', canActivate: [AuthGuard], component: AddProductComponent },
  { path: 'item/edit/:id', canActivate: [AuthGuard], component: EditProductComponent },
  { path: 'item/:id', component: ProductDetailComponent },
  { path: 'auth', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

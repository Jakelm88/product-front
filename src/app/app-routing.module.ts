import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthComponent } from './auth/auth.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: ProductListComponent },
  { path: 'new', canActivate: [AuthGuard], component: AddProductComponent },
  { path: 'item/edit/:id', canActivate: [AuthGuard], component: EditProductComponent },
  { path: 'item/:id', canActivate: [AuthGuard], component: ProductDetailComponent },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

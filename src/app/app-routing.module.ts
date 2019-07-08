import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { ProductCrudComponent } from './cruds/product-crud/product-crud.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helpers/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'facturacion', component: FacturacionComponent, canActivate: [AuthGuard]  },
  { path: 'productCrud', component: ProductCrudComponent, canActivate: [AuthGuard]  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

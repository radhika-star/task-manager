import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
{path:'login', component: LoginComponent},
{path:'register', component: RegisterComponent},
{path:'home', component: HomeComponent},
{path:'admin', loadChildren: ()=>import("./modules/admin/admin.module").then(e => e.AdminModule)},
{path:'user', loadChildren: ()=>import("./modules/user/user.module").then(e => e.UserModule)},
{path:'', redirectTo: 'home',pathMatch:'full'},
{
  path: '**', component:HomeComponent
}
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { UsersTaskComponent } from './components/users-task/users-task.component';

const routes: Routes = [
  {path:'dashboard', component: AdminComponent},
  {path:'user',component:UsersTaskComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

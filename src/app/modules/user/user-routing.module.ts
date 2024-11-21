import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { PosttaskComponent } from './components/posttask/posttask.component';

const routes: Routes = [
  {path:'dashboard', component: UserComponent},
  {path:'post', component: PosttaskComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

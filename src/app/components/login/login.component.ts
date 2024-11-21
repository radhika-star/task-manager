import { AuthService } from './../../services/auth.service';
import { Component, importProvidersFrom, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule,InputTextModule,FormsModule,PasswordModule,ButtonModule,RouterLink,MessagesModule,MenubarModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {
  private loginService = inject(AuthService);
  private routers= inject(Router);
  private messageService= inject(MessageService);

  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            route: '/home'
        },
        {
            label: 'Login',
            icon: 'pi pi-user',
            route: '/login'
        },
        {
            label: 'Register',
            icon: 'pi pi-user-plus',
            route: '/register'
        }
    ]
}
login= {
  email:'',
  password:'',
  role:''
}
onLogin() {
  const {email,password,role}= this.login;
  this.loginService.getUserDetails(email,password,role).subscribe({
    next:(response)=>{
      console.log(response);
      if(response.length>=1) {
        sessionStorage.setItem('email',email);
        if(role.toUpperCase()==='ADMIN')
        this.routers.navigate(['admin/dashboard']);
      else if(role.toUpperCase()==='USER')
        this.routers.navigate(['user/dashboard']);
      } else {
        this.messageService.add({
          severity:'error',
          summary:'Error',
          detail:'Incorrect username and password'
        });
      }
    }, error :(err)=> {
      console.log(err);
      this.messageService.add({
        severity:'error',
        summary:'Error',
        detail:'Something went wrong'
      });
    }
  });
}
}

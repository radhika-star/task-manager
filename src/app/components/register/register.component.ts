import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';
import { RegisterPostData } from '../../interfaces/auth';
import { MenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { Router } from '@angular/router';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MessagesModule,RadioButtonModule,FormsModule,CardModule,ButtonModule,InputTextModule,PasswordModule,RouterLink,CommonModule,MenubarModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService]
})

export class RegisterComponent {
  private registerService = inject(AuthService);
  private messageService= inject(MessageService);
  isMatch:boolean=false;
  items: MenuItem[] | undefined;
  role!: string;

  register= {
    fullName:'',
    email:'',
    password:'',
    confirmPassword:''
  }

  constructor(private router: Router) {}

  ngOnInit() {
    this.isMatch=false;
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
onRegister() {
  console.log(this);
    const postData:RegisterPostData= {
      fullName :this.register.fullName,
      email : this.register.email,
      password: this.register.password,
      role: this.role.toLowerCase()
    }
    console.log(this.registerService.checkIfUserExists(postData.email));
    if(!this.registerService.checkIfUserExists(postData.email)) {
    this.registerService.registerUser(postData as RegisterPostData).subscribe({
      next: (response:any) =>
       { console.log(response);},
      error : (err:any) => {
        console.log(err);
      }
    });
    this.router.navigate(['/login']);
  } else {
    this.messageService.add({
      severity:'error',
      summary:'Error',
      detail:'Email already exists'
    });
  }
  }
  passwordCheck(password:string,confirm:string) {
    if(password===confirm)
    {
      this.isMatch=true;
    }
    else
    {
      this.isMatch=false;
    }
  }


}

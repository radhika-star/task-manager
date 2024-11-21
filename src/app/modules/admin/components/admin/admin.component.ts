import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { User } from '../../../../interfaces/auth';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TableModule,CommonModule,RadioButtonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  private userService = inject(AuthService);
  users!: User[];
  selectedUser!: User;
  email!:string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userService.getUsers().subscribe({
      next: (response:any) =>
       {
        this.users=response;
        console.log(this.users);
      },
      error : (err:any) => {
        console.log(err);
      }
    });
  }

  userInfo(email:string) {
    this.email=email;
    console.log(email);
    this.viewUser();
  }

  viewUser() {
    sessionStorage.setItem('email',this.email);
    this.router.navigate(['/admin/user']);
  }

}

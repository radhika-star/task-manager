import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { Task } from '../../../../interfaces/tasks';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-users-task',
  imports: [DividerModule,CardModule,ToastModule,MenubarModule,ConfirmDialogModule,CommonModule],
  templateUrl: './users-task.component.html',
  styleUrl: './users-task.component.scss'
})
export class UsersTaskComponent {


  items: MenuItem[] | undefined;
  tasks: Task[]=[];
  private taskService = inject(AuthService);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.items = [

      {
          label: 'Dashboard',
          icon: 'pi pi-home',
          route: '/admin/dashboard'
      },
      {
          label: 'Logout',
          icon: 'pi pi-user-plus',
          route: '/home'
      }
    ]
      this.taskService.getTasks(sessionStorage.getItem('email')).subscribe({
        next: (response:any) =>
         {
          this.tasks=response;
          console.log(this.tasks);
        },
        error : (err:any) => {
          console.log(err);
        }
      });
  }

}

import { MenubarModule } from 'primeng/menubar';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../admin/services/admin.service';
import { title } from 'process';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { TaskData } from '../../../../interfaces/tasks';
import { AuthService } from '../../../../services/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-posttask',
  standalone: true,
  imports: [MenubarModule,CalendarModule,DialogModule,ButtonModule,PasswordModule,RadioButtonModule,CardModule,CommonModule,FormsModule,InputTextareaModule],
  templateUrl: './posttask.component.html',
  styleUrl: './posttask.component.scss'
})
export class PosttaskComponent {
  listOfUsers:any;
  listOfPriorities:any= ["PENDING", "COMPLETED"];
  date!: Date;
  value: string | undefined;
  items: MenuItem[] | undefined;

  taskForm= {
      title:'',
      description:'',
      status:'',
      dueDate: Date
  }
  visible: boolean = false;

  private taskService = inject(AuthService);
  constructor(private adminService: AdminService, private fb: FormBuilder,private router: Router) {
  }

  ngOnInit(): void {
    this.items = [

      {
          label: 'Dashboard',
          icon: 'pi pi-home',
          route: '/user/dashboard'
      },
      {
          label: 'Add Task',
          icon: 'pi pi-user-plus',
          route: '/user/post'
      },
      {
          label: 'Logout',
          icon: 'pi pi-user-plus',
          route: '/home'
      }
  ]
  }
  postTask() {
    if(this.date!=undefined) {
      console.log(this.date);
    }
    console.log(this);
    const postData:TaskData= {
      title:this.taskForm.title,
      description:this.taskForm.description,
      status:this.taskForm.status,
      dueDate: this.date,
      email: sessionStorage.getItem('email')
    }
    this.taskService.addTask(postData as TaskData).subscribe({
      next: (response:any) =>
       { console.log(response);},
      error : (err:any) => {
        console.log(err);
      }
    });
    this.router.navigate(['/user/dashboard']);
  }

  textChange(e:any) {
    this.taskForm.description=e.target.value;
    console.log(e);
  }

  calenderValue(e:any) {
    console.log(e.target);
    console.log(e.target.dataset.date);
    this.taskForm.dueDate=e.target.dataset.date;
    this.date=e.target.dataset.date;
    console.log("date value is", this.date);
  }

  cancel() {
    this.router.navigate(['/user/dashboard']);
  }

}

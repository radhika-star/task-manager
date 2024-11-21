import { MenubarModule } from 'primeng/menubar';
import { title } from 'process';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Task, TaskData } from '../../../../interfaces/tasks';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-user',
  standalone:true,
  imports: [MenubarModule,FormsModule,CalendarModule,RadioButtonModule,DialogModule,ConfirmDialogModule, ToastModule,CardModule,CommonModule,ButtonModule,DividerModule,MessagesModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  providers: [MessageService,ConfirmationService]
})
export class UserComponent {

  tasks: Task[]=[];
  private taskService = inject(AuthService);
  private messageService= inject(MessageService);
  private confirmationService= inject(ConfirmationService);
  visible: boolean = false;
  listOfUsers:any;
  listOfPriorities:any= ["PENDING", "COMPLETED"];
  date!: Date;
  value: string | undefined;
  items: MenuItem[] | undefined;

  taskForm= {
      title:'',
      description:'',
      status:'',
      dueDate: Date,
      id:''
  }
    showDialog(task:any) {
        this.visible = true;
        this.taskForm.id=task.id,
        this.taskForm.title=task.title,
        this.taskForm.description=task.description,
        this.taskForm.status=task.status,
        this.taskForm.dueDate= task.dueDate
    }

    closeDialog() {
        this.visible = false;
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

      delete(id:any, event: any) {
        console.log("inside");
        this.confirmationService.confirm({
          target: event.target as EventTarget,
          message: 'Do you want to delete this record?',
          header: 'Delete Confirmation',
          icon: 'pi pi-info-circle',
          acceptButtonStyleClass:"p-button-danger p-button-text",
          rejectButtonStyleClass:"p-button-text p-button-text",
          acceptIcon:"none",
          rejectIcon:"none",

          accept: () => {
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
              this.taskService.deleteTask(id).subscribe({
                next: (resp:any) =>
                {
                  window.location.reload();
                }
              });
            },
          reject: () => {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
          }
      });

      }

      update(task:any) {
        if(this.date!=undefined) {
          console.log(this.date);
          console.log(task);
        }
        console.log(this);
        const postData:Task= {
          id:task.id,
          title:task.title,
          description:task.description,
          status:task.status,
          dueDate: task.dueDate,
          email: sessionStorage.getItem('email')
        }

        this.taskService.updateTask(postData).subscribe({
          next: (resp:any) =>
          {
            console.log(resp);
            window.location.reload();
          }
        });
      }

}

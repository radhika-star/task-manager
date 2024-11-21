import { Get } from './../../../node_modules/dot-prop/node_modules/type-fest/source/get.d';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPostData, User } from '../interfaces/auth';
import { async, Observable } from 'rxjs';
import { Task, TaskData } from '../interfaces/tasks';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  registerUser(postData:RegisterPostData) {
    return this.http.post(`${this.baseUrl}/users`, postData)
  }

  checkIfUserExists(email:string | null): boolean {
     var users=this.http.get<User[]>(
      `${this.baseUrl}/users?email=${email}`
    );
    console.log("users ", users);
    users.subscribe(val=> {
      console.log("new date", val.length);
      if(val.length>0)
        return true;
      else
        return false;
    });
      return false;
  }

  getUserDetails(email:string, password:string,role:string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseUrl}/users?email=${email}&password=${password}&role=${role.toLowerCase()}`
    );
  }

  addTask(postData:TaskData) {
    console.log(this.checkIfUserExists(postData.email));
    return this.http.post(`${this.baseUrl}/tasks`, postData)
  }

  getTasks(email:string | null): Observable<TaskData[]> {
    return this.http.get<TaskData[]>(
      `${this.baseUrl}/tasks?email=${email}`
    );
  }

  deleteTask(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`
    );
  }

  updateTask(updateData:Task) {
    console.log("update", updateData);
    return this.http.put(`${this.baseUrl}/tasks/${updateData.id}`, updateData);
  }


  getUsers() {
    return this.http.get(
      `${this.baseUrl}/users?role=user`
    );
  }



}

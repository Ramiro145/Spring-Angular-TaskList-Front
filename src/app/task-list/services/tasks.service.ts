import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task.interface';
import { ResponseMessage } from '../interfaces/responsemessage.interface';

@Injectable({providedIn: 'root'})
export class TasksService {

  private baseUrl:string = environments.baseUrl;

  constructor(private http:HttpClient) { }

  public getTasks():Observable<Task[]>{
    return this.http.get<Task[]>(`${this.baseUrl}/orderTasks`);
  }


  //delete

  //save
  public saveTask(task:Task):Observable<Task>{
    return this.http.post<Task>(`${this.baseUrl}/task`,task);
  }

  //get task para modal




  public updateTask(task:Task):Observable<Task>{
    console.log(task)
    if(!task.id) throw new Error("Task id is required");
    return this.http.put<Task>(`${this.baseUrl}/task/${task.id}`,task);
  }

  public toggleTask(task:Task):Observable<Task>{
    //creating new object to toggle complete propertie
    const updatedTask = { ...task, completed: !task.completed };

    if(!task.id) throw new Error("Task id is required");
    return this.http.put<Task>(`${this.baseUrl}/task/${task.id}`,updatedTask);
  }

  public deleteTask(id?:number):Observable<ResponseMessage>{

    return this.http.delete<ResponseMessage>(`${this.baseUrl}/task/${id}`);

  }

}

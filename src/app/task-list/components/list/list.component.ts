import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { TasksService } from '../../services/tasks.service';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';
import { ResponseMessage } from '../../interfaces/responsemessage.interface';


@Component({
  selector: 'task-list-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  public isModal:boolean = false;

  show(message:string){
    Swal.fire(
      {
        title: message,
        text: 'Deleted succesfully!',
        color:'#3085d6',
        icon:'success',
        confirmButtonText:'Ok'
      }
    )
  }

  public tasks:Task[] = [];



  constructor(private tasksService:TasksService){}

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe((tasks)=>{
      this.tasks = tasks;

    })
  }

  toggleItem(task:Task):void{

    this.tasksService.toggleTask(task).subscribe((updatedTask)=>{
      //after the action call onInit
      this.ngOnInit();
    });

  }

  trackByTaskId(index: number, task: Task): number | undefined{
    return task.id;
  }

  deleteTask(task:Task){

    //we set a new variable with the title before deleting
    const titleTask = task.title;

    this.tasksService.deleteTask(task.id).subscribe((message:ResponseMessage)=>{
      this.ngOnInit();
      this.show(titleTask);
    })
  }

  editTask(){

    this.isModal = true;

  }


}

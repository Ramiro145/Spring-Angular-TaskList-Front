import { Component, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { TasksService } from '../../services/tasks.service';
import { delay } from 'rxjs';

@Component({
  selector: 'task-list-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  public tasks:Task[] = [];

  constructor(private tasksService:TasksService){}

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe((tasks)=>{
      this.tasks = tasks;
    })
  }

  toggleItem(task:Task):void{

    this.tasksService.toggleTask(task).subscribe((updatedTask)=>{
      console.log(updatedTask)
      //after the action call onInit
      this.ngOnInit();
    });

  }

  trackByTaskId(index: number, task: Task): number | undefined{
    return task.id;
  }


}

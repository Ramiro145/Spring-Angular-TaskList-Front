import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'task-list-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {

  public isLength:boolean = false;

  constructor(private tasksService:TasksService){}

  @Output()
  public onNewTask: EventEmitter<Task> = new EventEmitter();

  //object to set the task with default values again
  public task:Task = {
    title:'',
    description:'',
    completed:false
  }


  emitTask(){
    //task must have a title
    if(this.task.title.length === 0){
      this.isLength = true;
      return
    };

    this.isLength = false;

    this.onNewTask.emit(this.task);

    this.task ={
      title:'',
      description:'',
      completed:false
    }

  }



}

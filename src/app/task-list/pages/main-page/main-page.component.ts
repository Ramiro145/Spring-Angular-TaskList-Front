import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../interfaces/task.interface';
import { ListComponent } from '../../components/list/list.component';

@Component({
  selector: 'task-list-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  //we get the reference to the child component
  @ViewChild(ListComponent)listComponent!:ListComponent;



  constructor(
    private tasksService:TasksService,
  ){}

  title = 'Spring API - Todo List';


  onNewTask(task:Task){

    this.tasksService.saveTask(task).subscribe((task)=>{
      //we trigger this function after subscribing
      this.listComponent.ngOnInit();
    });


  }

}

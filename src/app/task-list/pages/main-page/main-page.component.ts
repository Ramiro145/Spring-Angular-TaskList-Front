import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../interfaces/task.interface';
import { ListComponent } from '../../components/list/list.component';
import Swal from 'sweetalert2';

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


  public showPost(postedTask:Task){
    console.log(postedTask)
    Swal.fire(
      {
        title: postedTask.title,
        text: 'Posted succesfully!',
        color:'#3085d6',
        icon:'success',
        confirmButtonText:'Ok'
      }
    )
  }

  onNewTask(task:Task){

    this.tasksService.saveTask(task).subscribe((id)=>{
      //we trigger this function after subscribing
      this.listComponent.ngOnInit();
      this.showPost(task);
    });


  }

}

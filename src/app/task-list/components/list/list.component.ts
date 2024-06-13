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

  public editingTask?:Task;
  public originalTask?:Task;
  public isLenght:boolean = false;

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

  showEdit(response:Task){
    Swal.fire(
      {
        title: response.title,
        text: 'Updated succesfully!',
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

  openModal(task:Task){
    this.isModal = true;
    //clone the task to edit
    this.editingTask = {...task};
    //save the original task
    this.originalTask = {...task};

    const modelDiv = document.getElementById('exampleModal');
    if(modelDiv != null){
      modelDiv.style.display = 'block';
      modelDiv.removeAttribute('aria-hidden');
      modelDiv.role = 'dialog';
      modelDiv.setAttribute('aria-modal',"true");

    }

  }

  closeModal(){

    this.isModal = false;

    if(this.originalTask){
      this.editingTask ={...this.originalTask};
    }



    setTimeout(() => {
      this.isLenght = false;
      const modelDiv = document.getElementById('exampleModal');
      if(modelDiv != null){

        modelDiv.style.display = 'none';

        modelDiv.setAttribute('aria-hidden',"true");
        modelDiv.removeAttribute('role');
        modelDiv.removeAttribute('aria-modal')
      }
    }, 100);



  }

  editTask(){

    if(!this.editingTask) return;


    const newTask:Task = {
      id:this.editingTask?.id,
      title: this.editingTask!.title,
      description: this.editingTask!.description,
      completed: this.editingTask!.completed
    }

    if(newTask.title.length <= 0){
      this.isLenght = true;
      return
    }

    this.isLenght = false;

    this.tasksService.updateTask(newTask).subscribe((response)=>{
      this.closeModal()
      this.ngOnInit();
      this.showEdit(response);
    });

  }


}

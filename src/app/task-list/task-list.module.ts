import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskListRoutingModule } from './task-list-routing.module';
import { ListComponent } from './components/list/list.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { MainPageComponent } from './pages/main-page/main-page.component';


@NgModule({
  declarations: [
    ListComponent,
    AddTaskComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    TaskListRoutingModule,
  ],
  exports:[
    ListComponent,
    AddTaskComponent,
    MainPageComponent
  ]
})
export class TaskListModule { }

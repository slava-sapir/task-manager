import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxRoutingModule } from './inbox-routing.module';
import { HomeComponent } from './home/home.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskIndexComponent } from './task-index/task-index.component';
import { TaskShowComponent } from './task-show/task-show.component';
import { TaskUpdateComponent } from './task-update/task-update.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { SuiModule } from 'ng2-semantic-ui';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskDeleteComponent } from './task-delete/task-delete.component';


@NgModule({
  declarations: [HomeComponent, TaskCreateComponent, 
    TaskIndexComponent, TaskShowComponent, TaskUpdateComponent, 
    PlaceholderComponent, NotFoundComponent, TaskFormComponent, TaskDeleteComponent],
  imports: [
    CommonModule,
    InboxRoutingModule,
    SuiModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class InboxModule { }

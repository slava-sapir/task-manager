import { TaskService } from './../task.service';
import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent implements OnInit{

  @Input() task: Task;
  showModal = false;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  onSubmit(task: Task) {
    this.taskService.updateTask(task).subscribe( () => {
    this.showModal = false;
    });
  }

}

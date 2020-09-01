import { TaskService } from './../task.service';
import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-index',
  templateUrl: './task-index.component.html',
  styleUrls: ['./task-index.component.css']
})
export class TaskIndexComponent implements OnInit {
  openItemIndex = false;
  tasks: Task[];
  option = '---Choose filter---';
  options: string[] = ['All tasks', 'Completed', 'Not completed',
                     'Descending order', 'Ascending order'];


  constructor(private taskService: TaskService,
              private router: Router) {
                this.taskService.refreshPage.subscribe( () => {
                  this.getTasks();
                  this.option = this.options[0];
                });
             }

  ngOnInit(): void {
     this.getTasks();
  }

  private getTasks() {
    this.taskService.getAllTasks()
      .subscribe( (tasks) => {
      this.tasks = tasks;
       });
  }

  optionFilter(filterVal: any) {
    switch (filterVal) {
      case 'Completed': {
        this.taskService.getCompletedTasks('true').subscribe( (tasks) => {
          this.tasks = tasks;
      });
        break;
      }
      case 'Not completed': {
        this.taskService.getCompletedTasks('false').subscribe( (tasks) => {
          this.tasks = tasks;
      });
        break;
      }
      case 'Descending order': {
        this.taskService.getCreatedAtTasks('createdAt:desc').subscribe( (tasks) => {
          this.tasks = tasks;
      });
        break;
      }

      case 'Ascending order': {
        this.taskService.getCreatedAtTasks('createdAt:asc').subscribe( (tasks) => {
          this.tasks = tasks;
      });
        break;
      }

      case 'All tasks': {
        this.taskService.getAllTasks()
          .subscribe( (tasks) => {
           this.tasks = tasks;
      });
        break;
      }

    }

   }

  }

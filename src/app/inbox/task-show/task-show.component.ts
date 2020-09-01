import { AvatarService } from './../../profile/avatar.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-task-show',
  templateUrl: './task-show.component.html',
  styleUrls: ['./task-show.component.css']
})
export class TaskShowComponent implements OnInit {
  task: Task;
 
  constructor(private route: ActivatedRoute,
              private router: Router,
              private taskService: TaskService) { 
               // fetching task data now was removed to constructor
              //  where we use resolver to avoid undefined error messages
              this.route.data.subscribe( ({ task }) => {
              this.task = task;
              });
              console.log(this.task);
             }

ngOnInit(): void {
    this.taskService.updatePage.subscribe( () => {
      this.getUpdatedTask();
    });
  }

private getUpdatedTask() {
   this.route.params.pipe(
     switchMap( ({ id }) => {
       return this.taskService.getTask(id);
      })
       ).subscribe( (task) => {
         this.task = task;
       });
}

onClick() {
  this.router.navigateByUrl('/inbox');
}
  
}

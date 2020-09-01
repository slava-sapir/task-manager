import { TaskService } from './task.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Task } from './task';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskResolverService implements Resolve<Task> {

  constructor(private taskService: TaskService,
              private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) {
     const { id } = route.params;
     return this.taskService.getTask(id)
     .pipe(
       catchError( () => {
         this.router.navigateByUrl('/inbox/not-found');
         return EMPTY;
       })
     );
  }

}

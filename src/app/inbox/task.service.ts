import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './task';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface TaskSummary {
  id: string;
  description: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
rootUrl = 'https://sapir-task-manager.herokuapp.com';

 // GET /tasks?completed=true
// GET /tasks?limit=1&skip=2
// GET /tasks?sortBy=createdAt:desc
// GET /tasks?sortBy=createdAt:asc

  constructor(private http: HttpClient) { }

  private _refreshPage$ = new Subject<void>();
  private _updatePage$ = new Subject<void>();

  get updatePage() {
    return this._updatePage$;
  }

  get refreshPage() {
    return this._refreshPage$;
  }

  getCompletedTasks(option: string) {
    option = option.trim();
    const options = option ?
    { params: new HttpParams().set('completed', option) } : {};
    return this.http.get<Task[]>(`${this.rootUrl}/tasks`, options);
  }

  getCreatedAtTasks(option: string) {
    option = option.trim();
    const options = option ?
    { params: new HttpParams().set('sortBy', option) } : {};
    return this.http.get<Task[]>(`${this.rootUrl}/tasks`, options);
  }

  getAllTasks() {
    return this.http.get<Task[]>(`${this.rootUrl}/alltasks`);
  }

  getTask(id: string) {
    return this.http.get<Task>(`${this.rootUrl}/tasks/${id}`);
  }

  updateTask(task: Task) {
    const id = task._id;
    const update = { description: task.description, completed: task.completed };
    return this.http.patch(`${this.rootUrl}/tasks/${id}`, update)
    .pipe(
      tap(() => this._updatePage$.next()),
      tap( () => this._refreshPage$.next())
     );
    }

  createTask(task: Task) {
    return this.http.post(`${this.rootUrl}/tasks/`, task)
    .pipe(
      tap(() => this._refreshPage$.next())
     );
  }

  deleteTask(task: Task) {
    const id = task._id;
    return this.http.delete(`${this.rootUrl}/tasks/${id}`)
    .pipe(
      tap(() => this._refreshPage$.next())
     );
  }
 
}

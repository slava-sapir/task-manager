import { TaskService } from './../task.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Task } from '../task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  showModal = false;
  @Input() task: Task;

  constructor(private taskService: TaskService,
              private router: Router ) {}

  ngOnInit(): void {}


  onSubmit(task: Task) {
    this.taskService.createTask(task).subscribe( () => {
    this.showModal = false;
    this.router.navigateByUrl('/inbox');
  });
 }


}

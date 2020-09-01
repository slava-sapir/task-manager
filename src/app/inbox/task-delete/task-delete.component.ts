import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-delete',
  templateUrl: './task-delete.component.html',
  styleUrls: ['./task-delete.component.css']
})
export class TaskDeleteComponent implements OnInit {

  @Input() task: Task;
  showModal = false;

  constructor(private taskService: TaskService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(task: Task) {
    this.taskService.deleteTask(task).subscribe( () => {
      this.showModal = false;
      this.router.navigateByUrl('/inbox');
    });
  }

}

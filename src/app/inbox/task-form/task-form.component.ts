import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';



@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  showModal: false;
  taskForm: FormGroup;
  ifChecked: boolean;
  @Input() task: Task;
  @Output() taskSubmit = new EventEmitter();

  
  constructor() {} 

  ngOnInit(): void {

    if (this.task) {
    const { _id, title, description, completed, createdAt, updatedAt } = this.task;
    this.taskForm = new FormGroup ({
    _id: new FormControl(_id),
    title: new FormControl({value: title, disabled: true}),
    createdAt: new FormControl(createdAt),
    updatedAt: new FormControl(updatedAt),
    completed: new FormControl(completed),
    description: new FormControl(description, [Validators.required])
  });
 } else {

  this.taskForm = new FormGroup ({
    title: new FormControl('', [Validators.required]),
    createdAt: new FormControl(''),
    updatedAt: new FormControl(''),
    completed: new FormControl(false),
    description: new FormControl('', [Validators.required])
  });
  } 

}


 
 onChange() {
   this.ifChecked = this.taskForm.get('completed').value;
   this.ifChecked = !this.ifChecked;
   this.taskForm.get('completed').setValue(this.ifChecked);
   console.log(this.taskForm.get('completed').value);
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      return;
    }
    this.taskSubmit.emit(this.taskForm.value);
  }

  reset(){
    this.taskForm.reset();
   // this.showModal = false;
  }

}


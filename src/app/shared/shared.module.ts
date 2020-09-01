import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ModalComponent } from './modal/modal.component';
import { AvatarComponent } from './avatar/avatar.component';
import { ClickOutsideModule } from 'ng-click-outside';


@NgModule({
  declarations: [InputComponent, ModalComponent, AvatarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClickOutsideModule
  ],
  exports: [ InputComponent, ModalComponent, AvatarComponent]
})
export class SharedModule { }

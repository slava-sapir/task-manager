import { Router, NavigationEnd } from '@angular/router';
import { AvatarService } from '../../profile/avatar.service';
import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';



@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent{
 
  changeClass: boolean = false;
  currentFileName: string;
  userId: string;
  userName: string;
  currentFile: File;
  userAvatar: any;
  defaultImageUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  rootUrl = 'https://sapir-task-manager.herokuapp.com';
 
  constructor(private avatarService: AvatarService,
              private router: Router) {  
                this.avatarService.refreshPage.subscribe( () =>{
                this.getMyProfile();
              }); 
            }

  ngOnInit() {
    this.getMyProfile();
    }
     

  getMyProfile() {
    this.avatarService.getProfile().subscribe( profile => {
      this.userId = profile._id;
      this.userName = profile.name;
      this.userAvatar = profile.avatar;
     // console.log(this.userId, this.userName);
    });
   }

  selectFile(files: FileList) {
    this.currentFile = files.item(0);
    this.currentFileName = this.currentFile.name;
  }
 
  onClickedOutside(e: Event) {
    this.changeClass = false;
  }

  classChange() {
     this.changeClass = !this.changeClass;
   }


  getSrc() {
    return `${this.rootUrl}/users/${this.userId}/avatar?t=${Date.now()}`;
  }

  uploadFile() {
     this.avatarService.upload(this.currentFile).subscribe( () => { });
     this.currentFile = null;
     this.changeClass = false;
    // this.router.navigateByUrl('/inbox');
   }

  delete(){
     this.avatarService.delete().subscribe( () => {});
     this.currentFile = null;
     this.changeClass = false;
     this.userAvatar = null;
   //  this.router.navigateByUrl('/inbox');
   }

  

}

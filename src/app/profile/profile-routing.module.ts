import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileResolverService } from './profile-resolver.service';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: '', component: ProfileComponent,
    resolve: {
      user: ProfileResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }

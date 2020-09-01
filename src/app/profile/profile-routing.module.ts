import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileResolverService } from './profile-resolver.service';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
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

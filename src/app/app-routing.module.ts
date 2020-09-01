import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: 'inbox',
    canLoad: [AuthGuard],
    loadChildren: () => import('./inbox/inbox.module').then( mod => mod.InboxModule)
  },
  {
    path: 'profile',
    canLoad: [AuthGuard],
    loadChildren: () => import('./profile/profile.module').then( mod => mod.ProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

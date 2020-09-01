import { NotFoundComponent } from './not-found/not-found.component';
import { TaskResolverService } from './task-resolver.service';
import { TaskShowComponent } from './task-show/task-show.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: '', 
  component: HomeComponent,
  children: [
    {
      path: 'not-found',
      component: NotFoundComponent
    },
    { path: ':id', component: TaskShowComponent,
      resolve: {
       task: TaskResolverService
     }
    },
    { path: '', component: PlaceholderComponent }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }

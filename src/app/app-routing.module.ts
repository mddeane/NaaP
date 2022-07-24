
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RundownComponent } from './rundown/rundown.component';
import { StoryComponent } from './story/story.component';

const routes: Routes = [
  { path: '', redirectTo: '/rundown', pathMatch: 'full' },
  { path: 'rundown', component: RundownComponent },
  { path: 'story', component: StoryComponent },

  // wildcard must be last
  { path: '**', component: StoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

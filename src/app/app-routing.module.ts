import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GithubRepoModalComponent } from './github-repo-modal/github-repo-modal.component';
import { GithubListComponent } from './github-list/github-list.component';

const routes: Routes = [
  { path: '', component: GithubListComponent },
  { path: ':id', component: GithubRepoModalComponent },
  { path: '**', component: GithubListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

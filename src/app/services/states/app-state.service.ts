import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GithubRepoService } from '../github-repo.service';

interface State {
  repos: any[];
}

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private initialState: State = {
    repos: [],
  };

  isLoading = false;

  constructor(private gitHubService: GithubRepoService) {
    this.gitHubService
      .getGitHubData(this.gitHubService.getLastMonth(), 1)
      .subscribe((repos) => {
        repos.map((el) => {
          el.rating = 0;
        });
        this.stateSubject.next({ ...this.stateSubject.getValue(), repos });
      });
  }

  private stateSubject: BehaviorSubject<State> = new BehaviorSubject<State>(
    this.initialState
  );
  state$: Observable<State> = this.stateSubject.asObservable();

  updatePost(post: any, rating: any): void {
    const currentState = this.stateSubject.getValue();
    const updatedPosts = currentState.repos.map((p) => {
      if (p.id === post.id) {
        p.rating = rating;
        return post;
      } else {
        return p;
      }
    });
    this.stateSubject.next({ ...currentState, repos: updatedPosts });
  }

  loadNextPage(startDate: string, currentPage: number): void {
    if (!this.isLoading) {
      this.isLoading = true;
      const currentState = this.stateSubject.getValue();

      this.gitHubService
        .getGitHubData(startDate, currentPage)
        .subscribe((repos) => {
          if (startDate) {
            currentState.repos = [];
          }
          currentState.repos.push(...repos);
          this.stateSubject.next({ ...currentState });
          this.isLoading = false;
        });
    }
  }
}

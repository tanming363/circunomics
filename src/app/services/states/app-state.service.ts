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
        this.stateSubject.next({ ...this.stateSubject.getValue(), repos });
      });
  }

  private stateSubject: BehaviorSubject<State> = new BehaviorSubject<State>(
    this.initialState
  );
  state$: Observable<State> = this.stateSubject.asObservable();

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

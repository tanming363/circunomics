import {
  Component,
  OnInit,
  HostListener,
  Input,
  OnDestroy,
} from '@angular/core';
import { GithubRepoService } from '../services/github-repo.service';
import { GithubRepoModalComponent } from '../github-repo-modal/github-repo-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { GithubRepoComponent } from '../github-repo/github-repo.component';
import { CommonService } from '../services/common.service';
import { AppStateService } from '../services/states/app-state.service';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-github-list',
  templateUrl: './github-list.component.html',
  styleUrls: ['./github-list.component.scss'],
  standalone: true,
  imports: [CommonModule, GithubRepoModalComponent, GithubRepoComponent],
})
export class GithubListComponent implements OnInit, OnDestroy {
  repos: any[] = [];
  subscription!: Subscription;
  currentPage = 1;
  isLoading = false;
  modalTitle = '';
  modalDescrption = '';
  startDate = '';

  constructor(
    private appState: AppStateService,
    private gitHubService: GithubRepoService,
    private commonService: CommonService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getstartDate();
    this.appState.state$.subscribe({
      next: (state) => {
        if (state.repos) {
          this.repos = [...state.repos];
        }
      },
      error: (error) => console.log(error),
      complete: () => console.log('Observable completed'),
    });
  }

  getstartDate() {
    this.commonService.date$.subscribe({
      next: (date) => {
        this.startDate = date;
        this.loadNextPage();
      },
      error: (error) => console.log(error),
      complete: () => console.log('Observable completed'),
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.shouldLoadNextPage()) {
      this.loadNextPage();
    }
  }

  shouldLoadNextPage(): boolean {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    return windowHeight + scrollY >= documentHeight - 200 && !this.isLoading;
  }

  loadNextPage(): void {
    if (!this.isLoading) {
      this.isLoading = true;
      this.subscription = this.gitHubService
        .getGitHubData(this.startDate, this.currentPage)
        .subscribe((repo: any) => {
          if (this.startDate) {
            this.repos = [];
          }
          this.repos.push(...repo);
          this.currentPage++;
          this.isLoading = false;
        });
    }
  }

  getUserData(data: any) {
    const dialogRef = this.dialog.open(GithubRepoModalComponent, {
      width: '500px',
      data: {
        modalTitle: data.name,
        modalDescrption: data.description,
        rating: data.rating,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(switchMap(() => this.commonService.ratingSubject$))
      .subscribe((rating) => {
        this.appState.updatePost(data, rating);
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

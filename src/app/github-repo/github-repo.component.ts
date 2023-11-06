import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../material.module';
import { NumberFormatPipe } from '../pipe/number-format.pipe';
import { GithubRepoRatingComponent } from '../github-repo-rating/github-repo-rating.component';
import { GithubRepoService } from '../services/github-repo.service';

@Component({
  selector: 'app-github-repo',
  templateUrl: './github-repo.component.html',
  styleUrls: ['./github-repo.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    NumberFormatPipe,
    GithubRepoRatingComponent,
  ],
})
export class GithubRepoComponent implements OnInit {
  @Input() repo = {} as any;
  @Output() userHandler: EventEmitter<any> = new EventEmitter<any>();
  currentRate = 0;
  isDisabled = true;

  constructor(private githubRepoService: GithubRepoService) {}

  ngOnInit(): void {
    this.getRating();
  }

  getRating() {
    this.githubRepoService.ratingSubject$.subscribe({
      next: (rating) => {
        this.currentRate = rating;
      },
      error: (error) => console.log(error),
      complete: () => console.log('Observable completed'),
    });
  }

  onClickRepo(user: any) {
    this.userHandler.emit(user);
  }
}

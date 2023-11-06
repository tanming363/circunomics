import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../material.module';
import { GithubRepoRatingComponent } from '../github-repo-rating/github-repo-rating.component';
import { GithubRepoService } from '../services/github-repo.service';

@Component({
  selector: 'app-github-repo-modal',
  templateUrl: './github-repo-modal.component.html',
  styleUrls: ['./github-repo-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, GithubRepoRatingComponent],
})
export class GithubRepoModalComponent {
  userRating = 0;

  constructor(
    private githubRepoService: GithubRepoService,
    public dialogRef: MatDialogRef<GithubRepoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onRateChanged(rating: number) {
    this.userRating = rating;
  }

  onApply() {
    const ratingData: { repoId: string; rating: number } = {
      repoId: this.data.repoId,
      rating: this.userRating,
    };
    this.githubRepoService.ratingSubject$.next(ratingData);
    this.dialogRef.close();
  }
}

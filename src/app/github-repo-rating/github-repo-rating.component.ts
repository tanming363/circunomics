import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-github-repo-rating',
  templateUrl: './github-repo-rating.component.html',
  styleUrls: ['./github-repo-rating.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule],
})
export class GithubRepoRatingComponent {
  @Input() currentRate = 0;
  @Input() isDisabled = false;
  @Output() rateChanged = new EventEmitter<number>();
  stars: number[] = [1, 2, 3, 4, 5];

  rate(rating: number) {
    this.currentRate = rating;
    this.rateChanged.emit(rating);
  }
}

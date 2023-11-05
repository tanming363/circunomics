import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubRepoRatingComponent } from './github-repo-rating.component';

describe('GithubRepoRatingComponent', () => {
  let component: GithubRepoRatingComponent;
  let fixture: ComponentFixture<GithubRepoRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GithubRepoRatingComponent]
    });
    fixture = TestBed.createComponent(GithubRepoRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

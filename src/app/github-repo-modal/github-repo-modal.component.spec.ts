import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubRepoModalComponent } from './github-repo-modal.component';

describe('GithubRepoModalComponent', () => {
  let component: GithubRepoModalComponent;
  let fixture: ComponentFixture<GithubRepoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GithubRepoModalComponent]
    });
    fixture = TestBed.createComponent(GithubRepoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

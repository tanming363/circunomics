import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubListComponent } from './github-list.component';

describe('GithubListComponent', () => {
  let component: GithubListComponent;
  let fixture: ComponentFixture<GithubListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GithubListComponent]
    });
    fixture = TestBed.createComponent(GithubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

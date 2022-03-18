import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardcardComponent } from './leaderboardcard.component';

describe('LeaderboardcardComponent', () => {
  let component: LeaderboardcardComponent;
  let fixture: ComponentFixture<LeaderboardcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderboardcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

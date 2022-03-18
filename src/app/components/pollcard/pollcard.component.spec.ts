import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollcardComponent } from './pollcard.component';

describe('PollcardComponent', () => {
  let component: PollcardComponent;
  let fixture: ComponentFixture<PollcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerFormationComponent } from './trainer-formation.component';

describe('TrainerFormationComponent', () => {
  let component: TrainerFormationComponent;
  let fixture: ComponentFixture<TrainerFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainerFormationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

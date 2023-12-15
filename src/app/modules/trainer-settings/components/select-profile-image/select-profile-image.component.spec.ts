import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProfileImageComponent } from './select-profile-image.component';

describe('SelectProfileImageComponent', () => {
  let component: SelectProfileImageComponent;
  let fixture: ComponentFixture<SelectProfileImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectProfileImageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProfileImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

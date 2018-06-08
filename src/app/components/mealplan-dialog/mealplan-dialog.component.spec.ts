import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealplanDialogComponent } from './mealplan-dialog.component';

describe('MealplanDialogComponent', () => {
  let component: MealplanDialogComponent;
  let fixture: ComponentFixture<MealplanDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealplanDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealplanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

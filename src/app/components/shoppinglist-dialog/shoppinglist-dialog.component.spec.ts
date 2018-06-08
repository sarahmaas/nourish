import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppinglistDialogComponent } from './shoppinglist-dialog.component';

describe('ShoppinglistDialogComponent', () => {
  let component: ShoppinglistDialogComponent;
  let fixture: ComponentFixture<ShoppinglistDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppinglistDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppinglistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

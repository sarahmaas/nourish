import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppinglistAdditemDialogComponent } from './shoppinglist-additem-dialog.component';

describe('ShoppinglistAdditemDialogComponent', () => {
  let component: ShoppinglistAdditemDialogComponent;
  let fixture: ComponentFixture<ShoppinglistAdditemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppinglistAdditemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppinglistAdditemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

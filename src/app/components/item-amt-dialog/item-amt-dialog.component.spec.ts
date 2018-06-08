import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAmtDialogComponent } from './item-amt-dialog.component';

describe('ItemAmtDialogComponent', () => {
  let component: ItemAmtDialogComponent;
  let fixture: ComponentFixture<ItemAmtDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemAmtDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAmtDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

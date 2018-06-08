import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import {IngredientShoppingList} from '../../models/IngredientShoppingList';

import {TitleCasePipe} from '../../pipes/title-case.pipe';

import { MatInputModule, MatFormField, MatAutocompleteModule, MatAutocompleteTrigger,
         MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormGroup, FormArray, FormBuilder,
         FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';

import { ItemAmtDialogComponent } from '../item-amt-dialog/item-amt-dialog.component';

@Component({
  selector: 'app-shoppinglist-item',
  templateUrl: './shoppinglist-item.component.html',
  styleUrls: ['./shoppinglist-item.component.css']
})
export class ShoppinglistItemComponent implements OnInit {

  @Input() list_item: IngredientShoppingList;
  @Input() background_color: string;
  @Output() purchasedEvent = new EventEmitter<any>();
  @Output() amountAdjustedEvent = new EventEmitter<any>();
  @Output() itemRemovedEvent = new EventEmitter<any>();

  constructor(public adjustDialog: MatDialog) { }

  ngOnInit() { }

  itemPurchased() {
    this.purchasedEvent.emit( this.list_item.id );
  }

  itemAmountAdjusted(amount: number) {
    this.amountAdjustedEvent.emit( {id: this.list_item.id, amount: amount } );
  }

  itemRemoved() {
    this.itemRemovedEvent.emit( this.list_item.id );
  }

  activateAdjustAmountDialog(): void {

    const dialogRef = this.adjustDialog.open(ItemAmtDialogComponent, {
      width: '350px',
      data: this.list_item
    });

    dialogRef.afterClosed().subscribe( result => {
      if ( result != null ) {
        this.itemAmountAdjusted(result.amount);
      }
    });
  }

}

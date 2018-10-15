

import { Component, OnInit, EventEmitter, Input, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatInputModule, MatFormField, MatAutocompleteModule, MatAutocompleteTrigger,
         MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ReactiveFormsModule, } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { appConfig } from '../../app.constants';

import { IngredientShoppingList } from '../../models/IngredientShoppingList';

import { ValidateRecipeType } from '../../validators/recipe-type-validator.validator';

import { TitleCasePipe } from '../../pipes/title-case.pipe';

// import { Observable, Subscription } from 'rxjs';
// import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-item-amt-dialog',
  templateUrl: './item-amt-dialog.component.html',
  styleUrls: ['./item-amt-dialog.component.css']
})
export class ItemAmtDialogComponent implements OnInit {

  amount: FormControl;

  constructor( public dialogRef: MatDialogRef<ItemAmtDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: IngredientShoppingList ) { }

  /*
   * init function: create form controls
   */

  ngOnInit() {

    // create our form group
    this.amount = new FormControl('', [ Validators.required,
                                        Validators.min(0.01),
                                        Validators.max(9999) ]);
  }

  /*
   * close dialog box (cancel)
   */

  closeDialog() {
    this.dialogRef.close();
  }

  /*
   * submit dialog (save)
   */

  onSubmit() {
    this.dialogRef.close({amount: this.amount.value });
  }

}

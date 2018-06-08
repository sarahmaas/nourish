import { AbstractControl } from '@angular/forms';
import { MealPlan } from '../models/MealPlan';

export function ValidateMealPlanName(control: AbstractControl) {
  if (!(control.value instanceof MealPlan)) {
    return { invalidMealPlan: true };
  }
  return null;
}


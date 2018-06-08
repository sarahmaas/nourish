import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialAppModule } from './ngmaterial.module';
import { FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Angular2TokenService } from 'angular2-token';
import { MaterializeModule } from 'angular2-materialize';
import { MatAutocompleteModule,
         MatFormFieldModule,
         MatButtonToggleModule,
         MatMenuModule,
         MatButtonModule,
         MatIconModule,
         MatCardModule,
         MatRadioModule,
         MatInputModule,
         MatSidenavModule,
         MatToolbarModule,
         MatListModule,
         MatDialogModule,
         MatSelectModule } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {SlideshowModule} from 'ng-simple-slideshow';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './/app-routing.module';

import { HomeComponent } from './components/home/home.component';
import { BrowseComponent } from './components/browse/browse.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MyRecipesComponent } from './components/myrecipes/myrecipes.component';
import { RecipeformComponent } from './components/recipeform/recipeform.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShoppinglistComponent } from './components/shoppinglist/shoppinglist.component';
import { MealplanComponent } from './components/mealplan/mealplan.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

import { RecipeService } from './services/recipe.service';
import { IngredientService } from './services/ingredient.service';
import { DietaryRestrictionService } from './services/dietary-restriction.service';
import { SelectIngredientComponent } from './components/select-ingredient/select-ingredient.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { MealPlanService } from './services/meal-plan.service';
import { ShoppingListService } from './services/shopping-list.service';
import { MeasureService } from './services/measure.service';

import { TitleCasePipe } from './pipes/title-case.pipe';
import { MealplanDialogComponent } from './components/mealplan-dialog/mealplan-dialog.component';
import { MealPlanValidator } from './validators/mealplan-validator.validator';
import { ShoppinglistDialogComponent } from './components/shoppinglist-dialog/shoppinglist-dialog.component';
import { ShoppinglistAdditemDialogComponent } from './components/shoppinglist-additem-dialog/shoppinglist-additem-dialog.component';
import { ShoppinglistItemComponent } from './components/shoppinglist-item/shoppinglist-item.component';
import { ItemAmtDialogComponent } from './components/item-amt-dialog/item-amt-dialog.component';
import { ShoppingListValidator } from './validators/shopping-list-validator.validator';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BrowseComponent,
    RecipeComponent,
    CalendarComponent,
    MyRecipesComponent,
    RecipeformComponent,
    HomepageComponent,
    ToolbarComponent,
    AuthDialogComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProfileComponent,
    ShoppinglistComponent,
    MealplanComponent,
    SidenavComponent,
    SelectIngredientComponent,
    UpdateProfileComponent,
    TitleCasePipe,
    MealplanDialogComponent,
    ShoppinglistDialogComponent,
    ShoppinglistAdditemDialogComponent,
    ShoppinglistItemComponent,
    ItemAmtDialogComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatDialogModule,
    MatRadioModule,
    MatListModule,
    MatInputModule,
    MatTabsModule,
    MatAutocompleteModule,
    MaterialAppModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterializeModule,
    FormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    CalendarModule.forRoot(),
    SlideshowModule,
    MatSelectModule
  ],
  providers: [
    Angular2TokenService,
    AuthService,
    AuthGuard,
    BrowseComponent,
    RecipeService,
    IngredientService,
    DietaryRestrictionService,
    MealPlanService,
    ShoppingListService,
    MeasureService,
    TitleCasePipe,
    MealPlanValidator,
    ShoppingListValidator
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    MealplanDialogComponent,
    ShoppinglistDialogComponent,
    ShoppinglistAdditemDialogComponent,
    ItemAmtDialogComponent
  ]
})
export class AppModule { }


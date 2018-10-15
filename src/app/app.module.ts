// angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AbstractControl,
         FormsModule,
         ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule,
         MatButtonModule,
         MatButtonToggleModule,
         MatCardModule,
         MatDialogModule,
         MatFormFieldModule,
         MatIconModule,
         MatInputModule,
         MatListModule,
         MatMenuModule,
         MatRadioModule,
         MatSelectModule,
         MatSidenavModule,
         MatToolbarModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';

// external libraries
import { AngularTokenModule } from 'angular-token';
import { CalendarModule } from 'angular-calendar';
import { MaterializeModule } from 'angular2-materialize';
import { SlideshowModule } from 'ng-simple-slideshow';

// config
import { environment } from '../environments/environment';

// app
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialAppModule } from './ngmaterial.module';

// app/components
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { BrowseComponent } from './components/browse/browse.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HomeComponent } from './components/home/home.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { ItemAmtDialogComponent } from './components/item-amt-dialog/item-amt-dialog.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MealplanComponent } from './components/mealplan/mealplan.component';
import { MealplanDialogComponent } from './components/mealplan-dialog/mealplan-dialog.component';
import { MyRecipesComponent } from './components/myrecipes/myrecipes.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipeformComponent } from './components/recipeform/recipeform.component';
import { RecipeformDialogComponent } from './components/recipeform-dialog/recipeform-dialog.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { SelectIngredientComponent } from './components/select-ingredient/select-ingredient.component';
import { ShoppinglistComponent } from './components/shoppinglist/shoppinglist.component';
import { ShoppinglistAdditemDialogComponent } from './components/shoppinglist-additem-dialog/shoppinglist-additem-dialog.component';
import { ShoppinglistDialogComponent } from './components/shoppinglist-dialog/shoppinglist-dialog.component';
import { ShoppinglistItemComponent } from './components/shoppinglist-item/shoppinglist-item.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';

// app/guards
import { AuthGuard } from './guards/auth.guard';

// app/services
import { AuthService } from './services/auth.service';
import { RecipeService } from './services/recipe.service';
import { IngredientService } from './services/ingredient.service';
import { DietaryRestrictionService } from './services/dietary-restriction.service';
import { MealPlanService } from './services/meal-plan.service';
import { ShoppingListService } from './services/shopping-list.service';
import { MeasureService } from './services/measure.service';

// app/pipes
import { TitleCasePipe } from './pipes/title-case.pipe';
import { CarouselComponent } from './components/carousel/carousel.component';

// app/validators
import { MealPlanValidator } from './validators/mealplan-validator.validator';
import { ShoppingListValidator } from './validators/shopping-list-validator.validator';
import { RecipeNameValidator } from './validators/recipe-name-validator.validator';


@NgModule({
  declarations: [
    AppComponent,
    BrowseComponent,
    NavbarComponent,
    HomeComponent,
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
    TitleCasePipe,
    MealplanDialogComponent,
    RecipeformDialogComponent,
    ShoppinglistDialogComponent,
    ShoppinglistAdditemDialogComponent,
    ShoppinglistItemComponent,
    ItemAmtDialogComponent,
    CarouselComponent,
    IngredientComponent,
    UpdateProfileComponent
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
    HttpClientModule,
    AngularTokenModule.forRoot(environment.token_auth_config),
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
    AngularTokenModule,
    AuthService,
    AuthGuard,
    BrowseComponent,
    IngredientService,
    DietaryRestrictionService,
    MealPlanService,
    RecipeService,
    ShoppingListService,
    MeasureService,
    TitleCasePipe,
    MealPlanValidator,
    ShoppingListValidator,
    RecipeNameValidator
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    MealplanDialogComponent,
    RecipeformDialogComponent,
    ShoppinglistDialogComponent,
    ShoppinglistAdditemDialogComponent,
    ItemAmtDialogComponent
  ]
})
export class AppModule { }


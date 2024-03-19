import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    HttpClientModule,
    RouterOutlet,
    RouterModule,
    LoginComponent,
    RegisterComponent,
    AllRecipesComponent,
    AddRecipeComponent,
    NavBarComponent,
    EditRecipeComponent,
  ],
})
export class AppComponent {
  title = 'finalProjectAngular';
}

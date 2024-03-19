import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'register/:name',
    data: { name: '???' },
    loadComponent: () =>
      import('./components/register/register.component').then((c) => c.RegisterComponent),
  },

  {
    path: 'singleRecipe',
    loadComponent: () =>
      import('./components/single-recipe/single-recipe.component').then(
        (c) => c.SingleRecipeComponent
      ),
  },

  {
    path: 'editRecipe/:id',
    loadComponent: () =>
      import('./components/edit-recipe/edit-recipe.component').then(
        (c) => c.EditRecipeComponent
      ),
  },

  {
    path: 'recipeDetails/:id',
    loadComponent: () =>
      import('./components/recipe-details/recipe-details.component').then(
        (c) => c.RecipeDetailsComponent
      ),
  },

  {
    path: 'addRecipe',
    loadComponent: () =>
      import('./components/add-recipe/add-recipe.component').then(
        (c) => c.AddRecipeComponent
      ),
  },
  { path: 'allRecipes', component: AllRecipesComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }, //אפשר לנתב לדף ייעודי
];

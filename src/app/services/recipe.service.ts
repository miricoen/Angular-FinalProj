import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserServiceService } from './user-service.service';
import { recipe } from '../model/recipe.model';
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public recipesList: recipe[] = [];
  public lang: BehaviorSubject<string> = new BehaviorSubject<string>('en');

  constructor(private _http: HttpClient,

    ) {
    this.fetchRecipes();
    console.log(this.recipesList);

  }

  fetchRecipes() {
    this._http
      .get<recipe[]>('http://localhost:5062/api/Recipe')
      .subscribe((recipes) => {
        this.recipesList = recipes;
        console.log('מערך בשליפה', this.recipesList);
      });
  }

getAllRecipes(): Observable<recipe[]>{
  return this._http
  .get<recipe[]>('http://localhost:5062/api/Recipe');
}

  getRecipeById(id: number): Observable<recipe> {
    console.log('id ', id);
    return this._http.get<recipe>(`http://localhost:5062/api/Recipe/${id}`);
  }

  // פונקציה זו מבצעת שליחת הנתונים לשרת
  addRecipe(recipeData: recipe): Observable<any> {
    return this._http.post('http://localhost:5062/api/Recipe', recipeData);
  }

  deleteRecipe(recipeId: number): Observable<void> {
    return this._http.delete<void>(
      `http://localhost:5062/api/Recipe/${recipeId}`
    );
  }

  editRecipe(editedRecipe: recipe): Observable<void> {
    const url = `http://localhost:5062/api/Recipe/${editedRecipe.id}`;
    return this._http.put<void>(url, editedRecipe);
  }
}

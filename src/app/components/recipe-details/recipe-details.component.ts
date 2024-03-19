import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { recipe } from '../recipe.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
// import { User } from '../user.model';
// import { Category } from '../../model/category.model';
// import { UserServiceService } from '../user-service.service';
import { CategoryService } from '../../services/category.service';
import { TimePipe } from '../../duration.pipe';
import { recipe } from '../../model/recipe.model';
import { Category } from '../../model/category.model';
import { UserServiceService } from '../../services/user-service.service';
import { RecipeService } from '../../services/recipe.service';
// import { RecipeService } from '../recipe.service';
// import { TimePipe } from '../duration.pipe';
// import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
  imports: [CommonModule, TimePipe],
})
export class RecipeDetailsComponent implements OnInit {
  public recipe!: recipe;
  public userIdForThisRecipe!: number;
  public categoryForThisRecipe!: Category;
  public recipeId!: number;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserServiceService,
    private _categoryService: CategoryService,
    private _recipeService: RecipeService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this._route.params.subscribe(async (param) => {
        this.recipeId = param['id'];
        const fetchedRecipe = await this._recipeService
          .getRecipeById(this.recipeId)
          .toPromise();

        if (fetchedRecipe) {
          this.recipe = fetchedRecipe;
          console.log('current recipe: ', this.recipe);

          this._userService.getUser(this.recipe.userId).subscribe({
            next: (user) => {
              console.log('משתמש שהתקבל מהשרת: ' + user);
              this.userIdForThisRecipe = user.id;
            },
            error: (err) => {
              console.log(err);
            },
          });

          this._categoryService
            .getCategoryById(this.recipe.categoryId)
            .subscribe({
              next: (category) => {
                console.log(category);
                this.categoryForThisRecipe = category;
              },
              error: (err) => {
                console.log(err);
              },
            });
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  isCurrentUserRecipeOwner(): boolean {
    return this.recipe.userId === this.userIdForThisRecipe;
  }

  deleteRecipe(): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this._recipeService.deleteRecipe(this.recipe.id).subscribe(
        () => {
          // אם המחיקה בוצעה בהצלחה, נותרים למשתמש רק לנווט לעמוד הרלוונטי
          this._router.navigate(['/allRecipes']);
        },
        (error) => {
          // אם המחיקה נכשלה, נציג הודעת שגיאה
          console.error('Failed to delete recipe:', error);
          alert('Failed to delete recipe. Please try again later.');
        }
      );
    }
  }

  toeditRecipeComponent(): void {
    if (this.recipe && this.recipe.id) {
      console.log('navigates', this.recipe.id);
      this._router.navigate(['/editRecipe', this.recipe.id]);
    } else {
      console.error('Recipe ID is undefined or null.');
    }
  }
}

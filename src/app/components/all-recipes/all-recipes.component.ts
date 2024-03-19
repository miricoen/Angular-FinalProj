import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { recipe } from '../../model/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { SingleRecipeComponent } from '../single-recipe/single-recipe.component';
import { CategoryService } from '../../services/category.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Category } from '../../model/category.model';
@Component({
  selector: 'app-all-recipes',
  standalone: true,
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.css',
  imports: [CommonModule, RouterModule, SingleRecipeComponent, FormsModule],
})
export class AllRecipesComponent implements OnInit {
  public selectedRecipeToShow!: recipe;
  public ArrRecipe: recipe[] = [];
  public recipeNameFilter!: string;
  preparationTimeFilter!: number;
  public selectedCategory: number | undefined;
  categoryList: Category[] = [];

  constructor(private _recipeService: RecipeService,
    private _categoryService: CategoryService
    ) {}

  ngOnInit(): void {
    this.ArrRecipe = this._recipeService.recipesList;
    // console.log(this.ArrRecipe)
    this._categoryService.getCategories().subscribe({
      next: (res) => {
        this.categoryList = res;
        console.log(this.categoryList);
      },
      error: (err) => {
        console.log(err);
      },
    });

  }

  filterRecipesByName() {
    if (this.recipeNameFilter) {
      this.ArrRecipe = this._recipeService.recipesList.filter((recipe) =>
        recipe.name.toLowerCase().includes(this.recipeNameFilter.toLowerCase())
      );
    }
  }
  filterByPreparationTime(): void {
    if (this.preparationTimeFilter) {
      this.ArrRecipe = this._recipeService.recipesList.filter((recipe) => {
        return recipe.preparationTime === this.preparationTimeFilter;
      });
    }
  }

  filterByCategory(): void {
    if (!this.selectedCategory) {
      return;
    }

    this.ArrRecipe = this._recipeService.recipesList.filter(recipe => {
      return recipe.categoryId === this.selectedCategory;
    });
  }
}

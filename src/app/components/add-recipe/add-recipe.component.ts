import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
// 
import { Category } from '../../model/category.model';
import { CategoryService } from '../../services/category.service';
import { RecipeService } from '../../services/recipe.service';
import { UserServiceService } from '../../services/user-service.service';
import { recipe } from '../../model/recipe.model';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css',
})
export class AddRecipeComponent implements OnInit {
  addRecipeForm!: FormGroup;
  errorMessage: string | undefined;
  successMessage: string | undefined;
  categoryList: Category[] = [];
  recipeToAdd!: recipe;
  static count1: number = 9;
  static count2: number = 8;

  constructor(
    // private route: ActivatedRoute,
    private _recipeService: RecipeService,
    private _userService: UserServiceService,
    private _categoryService: CategoryService,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this._categoryService.getCategories().subscribe({
      next: (res) => {
        this.categoryList = res;
        console.log(this.categoryList);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.addRecipeForm = new FormGroup({
      Name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      // סלקטור לבחירת קטגוריה ושמירה של ה
      // ID לפי הבחירה
      // CategoryId: new FormControl('', [Validators.required]),
      selectedCategory: new FormControl('category'),

      PreparationTime: new FormControl('', [
        Validators.required,
        Validators.min(5),
      ]),
      Level: new FormControl('1', [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ]),
      Products: this._formBuilder.array([this._formBuilder.control('')]),
      Instructions: this._formBuilder.array([this._formBuilder.control('')]),
      Image: new FormControl('', [Validators.required]),
    });
  }

  get ProductsArray() {
    return this.addRecipeForm.get('Products') as FormArray;
  }

  get InstructionsArray() {
    return this.addRecipeForm.get('Instructions') as FormArray;
  }

  addProduct() {
    const lastControl = this.ProductsArray.at(this.ProductsArray.length - 1);
    if (lastControl.value.trim() !== '') {
      this.ProductsArray.push(this._formBuilder.control(''));
      console.log(this.ProductsArray);
    }
  }

  addPreparationStep() {
    const lastControl = this.InstructionsArray.at(
      this.InstructionsArray.length - 1
    );
    if (lastControl.value.trim() !== '') {
      this.InstructionsArray.push(this._formBuilder.control(''));
      console.log(this.InstructionsArray);
    }
  }

  removeEmptyproducts() {
    for (let i = this.ProductsArray.length - 1; i >= 0; i--) {
      if (this.ProductsArray.at(i).value.trim() === '') {
        this.ProductsArray.removeAt(i);
      }
    }
  }

  removeEmptyPreparationSteps() {
    for (let i = this.InstructionsArray.length - 1; i >= 0; i--) {
      if (this.InstructionsArray.at(i).value.trim() === '') {
        this.InstructionsArray.removeAt(i);
      }
    }
  }

  imageUrlValidator() {
    return (control: FormControl) => {
      const urlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
      const isValid = urlRegex.test(control.value);
      return isValid ? null : { invalidUrl: true };
    };
  }

  onSubmit(): void {
    console.log('onSubmit');
    this.recipeToAdd = new recipe();
    (this.recipeToAdd.id = ++AddRecipeComponent.count1),
      //  אני צריכה לעשות סוג של ID רץ
      // console.log(AddRecipeComponent.count1);

      (this.recipeToAdd.name = this.addRecipeForm.get('Name')!.value);
    this.recipeToAdd.categoryId =
      this.addRecipeForm.get('selectedCategory')!.value;
    this.recipeToAdd.preparationTime =
      this.addRecipeForm.get('PreparationTime')!.value;
    this.recipeToAdd.level = this.addRecipeForm.get('Level')!.value;
    this.recipeToAdd.dateAdded = new Date();
    this.recipeToAdd.products = this.addRecipeForm.get('Products')!.value;
    this.recipeToAdd.instructions =
      this.addRecipeForm.get('Instructions')!.value;
    this.recipeToAdd.userId = parseInt(sessionStorage.getItem('userId') || '');
    this.recipeToAdd.image = this.addRecipeForm.get('Image')!.value;

    if (this.addRecipeForm.invalid) {
      return;
    }

    // שליחת הנתונים לשרת באמצעות השירות
    this._recipeService.addRecipe(this.recipeToAdd).subscribe({
      next: () => {
        // טיפול בהצלחת השליחה
        Swal.fire({
          icon: 'success',
          title: 'המתכון נוסף בהצלחה!',
          showConfirmButton: false,
          timer: 1500,
        });

        // ניווט לדף all recipe
        this._router.navigate(['/allRecipes']);

        // console.log('Recipe added successfully!');
      },
      error: (error) => {
        // טיפול בשגיאה במידה והשליחה נכשלה
        console.error('Failed to add recipe. Error:', error);
      },
    });
  }
}

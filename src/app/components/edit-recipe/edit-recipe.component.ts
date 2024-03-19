import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { recipe } from '../../model/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css',
})
export class EditRecipeComponent implements OnInit {
  // @Input() recipeInput!: recipe;
  editRecipeForm!: FormGroup;
  fetchedRecipe!: recipe;

  constructor(
    private fb: FormBuilder,
    private _recipeService: RecipeService,
    private _route: ActivatedRoute
  ) {

    this._route.params.subscribe(async (param) => {
      const fetchedRecipeId = param['id'];
        const fetchedRecipe = await this._recipeService
          .getRecipeById(fetchedRecipeId)
          .toPromise();

      if (fetchedRecipe) {
        this.fetchedRecipe = fetchedRecipe;
      }
    });
    this.editRecipeForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      // category: ['', Validators.required],//selector- to implement
      preparationTime: ['', Validators.required],
      level: ['', Validators.required],
      products: this.fb.array([]),
      instructions: this.fb.array([]),
      image: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this._route.params.subscribe(async (param) => {
      this.fetchedRecipe.id = param['id'];
      const fetchedRecipe = await this._recipeService
        .getRecipeById(this.fetchedRecipe.id)
        .toPromise();
      if (fetchedRecipe) {
        this.fetchedRecipe = fetchedRecipe;
      }
    });
  }

  cancel(): void {
    // Implement cancel logic here
  }

  saveChanges(): void {
    if (this.editRecipeForm.valid) {
      const editedRecipe: recipe = {
        id: this.fetchedRecipe.id,
        name: this.editRecipeForm.value.name,
        categoryId: this.fetchedRecipe.categoryId,
        preparationTime: this.editRecipeForm.value.preparationTime,
        level: this.editRecipeForm.value.level,
        products: this.editRecipeForm.value.products,
        instructions: this.editRecipeForm.value.instructions,
        image: this.editRecipeForm.value.image,
        dateAdded: this.fetchedRecipe.dateAdded,
        userId: this.fetchedRecipe.userId,
      };

      this._recipeService.editRecipe(editedRecipe).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'המתכון עודכן בהצלחה!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        error: (error) => {
          console.error('Failed to edit recipe. Error:', error);
        },
      });
    }
  }

  // Add product to the products form array
  addProduct() {
    this.products.push(this.fb.control(''));
  }

  // Remove product from the products form array
  removeProduct(index: number) {
    this.products.removeAt(index);
  }

  // Add instruction to the instructions form array
  addInstruction() {
    this.instructions.push(this.fb.control(''));
  }

  // Remove instruction from the instructions form array
  removeInstruction(index: number) {
    this.instructions.removeAt(index);
  }

  // Getter for the products form array
  get products() {
    return this.editRecipeForm.get('products') as FormArray;
  }

  // Getter for the instructions form array
  get instructions() {
    return this.editRecipeForm.get('instructions') as FormArray;
  }
}
// this.editRecipeForm = this.fb.group({
//   name: [this.fetchedRecipe.name, [Validators.required, Validators.minLength(3)]],
//   category: [this.fetchedRecipe.categoryId, Validators.required],//selector- to implement
//   preparationTime: [this.fetchedRecipe.preparationTime, Validators.required],
//   level: [this.fetchedRecipe.level, Validators.required],
//   products: this.fb.array([]),
//   instructions: this.fb.array([]),
//   image: [this.fetchedRecipe.image, Validators.required],
// });
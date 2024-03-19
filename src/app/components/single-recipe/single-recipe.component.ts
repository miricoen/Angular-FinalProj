import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Category } from '../../model/category.model';
import { CategoryService } from '../../services/category.service';
import { TimePipe } from '../../duration.pipe';
import { recipe } from '../../model/recipe.model';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-single-recipe',
  standalone: true,
  // exports: [
  //   DurationPipe
  // ],
  templateUrl: './single-recipe.component.html',
  styleUrl: './single-recipe.component.css',
  imports: [RouterModule, CommonModule, TimePipe],
})
export class SingleRecipeComponent implements OnInit {
  @Input() recipeInput!: recipe;
  constructor(
    private _router: Router,
    private _userService: UserServiceService
  ) {}

  ngOnInit(): void {}

  ShowRecipeDetails() {
    if (this._userService.isCurrentUserRecipeOwner(this.recipeInput.userId)) {
      this._router.navigate(['/recipeDetails', this.recipeInput.id]);
    } else {
      alert('עליך להתחבר כדי לצפות בפרטי המתכון.');
    }
  }
}

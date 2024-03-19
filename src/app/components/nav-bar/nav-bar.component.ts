import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  constructor(private route: ActivatedRoute, private _router: Router) {}


  navigateToLogin() {
    this._router.navigate(['/login']);
  }

  navigateToRegister() {
    this._router.navigate(['/register/???']);
  }

  navigateToAllRecipes() {
    this._router.navigate(['/allRecipes']);
  }

  navigateToAddRecipe() {
    this._router.navigate(['/addRecipe']);
  }

  logout() {
    // מחיקת פרטי הגולש הנוכחי מה- sessionStorage
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
  
    // ניווט לדף ההתחברות (login)
    this._router.navigate(['/login']);
  }
  
}

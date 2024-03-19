import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// import { UserServiceService } from '../user-service.service';
// import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  errorMessage: string | undefined;

  // constructor() {}
  constructor(
    private _UserServiceService: UserServiceService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async OnClickEnter() {
    try {
      const username = this.loginForm.get('name')!.value;
      const password = this.loginForm.get('password')!.value;

      sessionStorage.setItem('username', username);
      sessionStorage.setItem('password', password);

      console.log(username, password);
      await this._UserServiceService.login(username, password);
      console.log(1);
      try {
        const userId = await this._UserServiceService.getUserId(
          username,
          password
        );
        // this._UserServiceService.currentUser = userId;
        sessionStorage.setItem('userId', userId.toString());

        console.log('מזהה המשתמש:', userId);
      } catch (error) {
        console.error('שגיאה במהלך קבלת מזהה המשתמש:', error);
      }

      this._router.navigate(['/allRecipes']);
    } catch (error: any) {
      if (error.message === 'משתמש אינו קיים') {
        this.errorMessage = 'משתמש אינו קיים. אנא הירשם.';
        this._router.navigate(['/register', this.loginForm.get('name')!.value]);
      } else if (error.message === 'סיסמה שגויה') {
        this.errorMessage = 'סיסמה שגויה. אנא נסה שוב.';
      } else {
        // טיפול בשגיאות לא צפויות
        console.error(error);
        //'שגיאה בלתי צפויה. אנא נסה שוב מאוחר יותר.';
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// import { UserServiceService } from '../user-service.service';
// import { User } from '../user.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | undefined;
  successMessage: string | undefined;
  userNameFromRoute: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private _UserServiceService: UserServiceService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.userNameFromRoute = param['name'];
    });

    this.registerForm = new FormGroup({
      "id": new FormControl('', [Validators.required]),
      "userName": new FormControl(this.userNameFromRoute, [
        Validators.required,
        Validators.minLength(3),
      ]),
      "address": new FormControl('', [Validators.required]),
      "email": new FormControl('', [Validators.required, Validators.email]),
      "password": new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    console.log('id:   ' + this.registerForm.get('id')!.value);

    const tempUser = new User();
    tempUser.id = this.registerForm.get('id')!.value;
    tempUser.name = this.registerForm.get('userName')!.value;
    tempUser.address = this.registerForm.get('address')!.value;
    tempUser.email = this.registerForm.get('email')!.value;
    tempUser.password = this.registerForm.get('password')!.value;
    // tempUser.password = this.registerForm.value.password;
    // const jsonUser = JSON.stringify(tempUser);

    // this._UserServiceService.register(jsonUser).subscribe({
      this._UserServiceService.register(tempUser).subscribe({
      next: () => {
        this.successMessage = 'הרישום בוצע בהצלחה!';
        console.log('הרישום בוצע בהצלחה!');
        // ניתוב לדף כניסה לאתר
        // this._UserServiceService.currentUser = tempUser.id;

        sessionStorage.setItem('userId', tempUser.id.toString());
        sessionStorage.setItem('username', tempUser.name);
        sessionStorage.setItem('password', tempUser.password);

        this._router.navigate(['/allRecipes']);
      },
      error: (error: any) => {
        if (error.status === 409) {
          this.errorMessage = 'משתמש עם שם משתמש זה כבר קיים.';
        } else {
          console.error(error);
          console.log('שגיאה בלתי צפויה. אנא נסו שוב מאוחר יותר.');
          this.errorMessage = 'שגיאה בלתי צפויה. אנא נסו שוב מאוחר יותר.';
        }
      },
    });
  }
}

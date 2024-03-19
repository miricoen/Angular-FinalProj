import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user.model';
// import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private _usersList: User[] = [];
  // public currentUser!: number;
  public lang: BehaviorSubject<string> = new BehaviorSubject<string>('en');

  constructor(private _http: HttpClient) {
    this.fetchUsers();
  }

  fetchUsers() {
    this._http
      .get<User[]>('http://localhost:5062/api/User')
      .subscribe((users) => {
        this._usersList = users;
      });
  }

  isCurrentUserRecipeOwner(id:number): boolean {
    console.log(parseInt(sessionStorage.getItem('userId') || ''))
    return id === parseInt(sessionStorage.getItem('userId') || '');
  }



  async login(username: string, password: string): Promise<void> {
    console.log(this._usersList);
    const user = await this.findUser(username);

    if (!user) {
      console.log('משתמש אינו קיים');
      throw new Error('משתמש אינו קיים');
    }

    if (!this.validatePassword(user, password)) {
      console.log('סיסמה שגויה');
      throw new Error('סיסמה שגויה');
    }
    console.log('משתמש הצליח להכנס');
  }

  async getUserId(username: string, password: string): Promise<number> {
    const user = await this.findUser(username);

    if (!user) {
      throw new Error('משתמש אינו קיים');
    }

    if (!this.validatePassword(user, password)) {
      throw new Error('סיסמה שגויה');
    }

    return user.id;
  }

  private async findUser(username: string): Promise<User | undefined> {
    const users = this._usersList;
    return users.find((u) => u.name == username);
  }

  private validatePassword(user: User, password: string): boolean {
    return user.password === password;
  }

  // register(newUser: string): Observable<any> {
  //   console.log("new user  ",newUser)
  //   return this._http.post('http://localhost:5062/api/User', newUser);
  // }

  register(newUser: User): Observable<any> {
    console.log("new user  ",newUser)
    return this._http.post('http://localhost:5062/api/User', newUser);
  }

  getUser(id: number): Observable<User> {
    return this._http.get<User>(`http://localhost:5062/api/User/${id}`);
  }
}

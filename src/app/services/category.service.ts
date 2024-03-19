import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this._http.get<Category[]>('http://localhost:5062/api/Category');
  }

  getCategoryById(id: number): Observable<Category> {
    return this._http.get<Category>(`http://localhost:5062/api/Category/${id}`);
  }
}

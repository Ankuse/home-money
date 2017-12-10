import {BaseApi} from '../../../shared/core/base-api';
import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Category} from '../models/category.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CategoriesService extends BaseApi {

  constructor(
      public http: Http
  ) {
      super(http);
  }

  addCategory(category: Category): Observable<Category> {
    return this.post('categories', category);
  }
  deleteCategory(category: Category ): Observable<Category> {
     return this.http.delete(`http://localhost:3000/categories/${category.id}`)
         .map( ( response: Response) => response.json() , console.log(category.id));
  }

  getCategories(): Observable<Category[]> {
    return this.get('categories');
  }

  updateCategory(category: Category): Observable<Category> {
    return this.put(`categories/${category.id}`, category);
  }

}

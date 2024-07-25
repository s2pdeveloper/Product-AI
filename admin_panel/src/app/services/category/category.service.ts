import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ApiService } from 'src/app/core/services/httpApi.service';
// import { ICat } from '@interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  routes: any = {
    createPath: `category/create`,
    getByIDPath: (id: any) => `category/getById/${id}`,
    getAllPath: ({ page, pageSize, search }) =>
      `category/getAll?page=${page}&pageSize=${pageSize}&search=${search}`,
    updatePath: (id: any) => `category/update/${id}`,
    deletePath: (id: any) => `category/delete/${id}`,
    getAll: (id: any) => `category/getAll/${id}`,
  };

  constructor(private http: ApiService) {}

  createUser(payload:any) {
    return this.http.post(this.routes.createPath, payload).pipe(
      map((res: any) => res),
      catchError(this.handleErrorObservable)
    );
  }

  getAllUsers(payload) {
    return this.http.get(this.routes.getAllPath(payload)).pipe(
      map((res: any) => res),
      catchError(this.handleErrorObservable)
    );
  }

  updateUser(id, payload) {
    return this.http.put(this.routes.updatePath(id), payload).pipe(
      map((res: any) => res),
      catchError(this.handleErrorObservable)
    );
  }

  deleteUser(id) {
    return this.http.delete(this.routes.deletePath(id)).pipe(
      map((res: any) => res),
      catchError(this.handleErrorObservable)
    );
  }

  profile(id: any) {
    return this.http.get(this.routes.getByIDPath(id)).pipe(
      map((res: any) => res),
      catchError(this.handleErrorObservable)
    );
  }

  private handleErrorObservable(error: HttpErrorResponse) {
    return throwError(error);
  }
}

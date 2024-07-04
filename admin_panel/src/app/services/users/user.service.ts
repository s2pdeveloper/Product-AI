import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ApiService } from 'src/app/core/services/httpApi.service';
import { IUser } from '@interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  routes: any = {
    createPath: `user/register`,
    getByIdPath: (id) => `user/?id=${id}`,
    getAllPath: ({ page, pageSize, search }) =>
      `user/?page=${page}&pageSize=${pageSize}&search=${search}`,
    updatePath: (id) => `user/?id=${id}`,
    deletePath: (id) => `user/${id}`,
  };

  constructor(private http: ApiService) {}

  createUser(payload) {
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
  updateUser(id, payload: IUser) {
    return this.http.put(this.routes.updatePath(id), payload).pipe(
      map((res: any) => res),
      catchError(this.handleErrorObservable)
    );
  }

  profile(id) {
    return this.http.get(this.routes.getByIdPath(id)).pipe(
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

  private handleErrorObservable(error: HttpErrorResponse) {
    return throwError(error);
  }
}

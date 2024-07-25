import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ApiService } from 'src/app/core/services/httpApi.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  patchValue(data: any) {
    throw new Error('Method not implemented.');
  }
  routes: any = {
    createPath: `product/create`,
    getByIDPath: (id: any) => `product/getById/${id}`,
    getAllPath: ({ page, pageSize, search }) =>
      `product/getAll?page=${page}&pageSize=${pageSize}&search=${search}`,
    getAllMasterDataPath: `product/getAllCategory`,
    updatePath: (id: any) => `product/update/${id}`,
    deletePath: (id: any) => `product/delete/${id}`,
    getAll: (id: any) => `product/getAll/${id}`,
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

  getAllMasterData() {
    return this.http.get(this.routes.getAllMasterDataPath).pipe(
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

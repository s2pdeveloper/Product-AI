import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";

import {map, catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import { ApiService } from "../../core/services/httpApi.service";
@Injectable({
    providedIn: "root",
})
export class ImageService {
  routes: any = {
    createPath: `images/create`,
    getAllPath: ({ page, pageSize, search, flag }) =>
      `images/getAll?page=${page}&pagesize=${pageSize}&search=${search}&flag=${flag}`,
    updatePath: (id) => `images/update/${id}`,
    getByIdPath: (id) => `images/getById/${id}`,
    deletePath: (id) => `images/delete/${id}`,
  };
  constructor(private http: ApiService) {}

    createImage(payload) {
        return this.http.post(environment.apiEndpoint + `images/createImage`, payload).pipe(
            map((res: any) => res),
            catchError(this.handleErrorObservable)
        );
    }

  getImageListing({ page, pageSize, search, flag }) {
    return this.http
      .get(this.routes.getAllPath({ page, pageSize, search, flag }))
      .pipe(
        map((res: any) => res),
        catchError(this.handleErrorObservable)
      );
  }

    updateImage(id, payload) {
        return this.http.put(environment.apiEndpoint + `images/updateImage/${id}`, payload).pipe(
            map((res: any) => res),
            catchError(this.handleErrorObservable)
        );
    }

    getImageById(id) {
        return this.http.get(environment.apiEndpoint + `images/getImageById/${id}`).pipe(
            map((res: any) => res),
            catchError(this.handleErrorObservable)
        );
    }
    deleteImage(id) {
        return this.http.delete(environment.apiEndpoint + `images/deleteImage/${id}`).pipe(
            map((res: any) => res),
            catchError(this.handleErrorObservable)
        );
    }

  private handleErrorObservable(error: HttpErrorResponse) {
    return throwError(error);
  }
}

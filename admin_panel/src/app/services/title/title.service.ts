import { Injectable } from '@angular/core';
import { map,  } from 'rxjs/operators';
import { ApiService } from '../../core/services/httpApi.service';
@Injectable({
  providedIn: 'root'
})

export class TitleService {
  routes: any = {
    createPath: `title/`,
    getAllPath: ({ page, pageSize, search }) =>
      `title/?page=${page}&pagesize=${pageSize}&search=${search}`,
    updatePath: (id) => `title/${id}`,
    getByIdPath: (id) => `title/${id}`,
    deletePath: (id) => `title/${id}`,
  };
  constructor(private http: ApiService) {}

  createTitle(payload) {
    return this.http.post(this.routes.createPath, payload).pipe(
       map((res: any) => res),
     
    );
  }

  getAllTitle(payload) {
    return this.http.get(this.routes.getAllPath(payload)).pipe(
      map((res: any) => res),
     
    );
  }

  updateTitle(id, payload) {
    return this.http.put(this.routes.updatePath(id), payload).pipe(
      map((res: any) => res),
     
    );
  }

  getTitleById(id) {
    return this.http.get(this.routes.getByIdPath(id)).pipe(
      map((res: any) => res),
     
    );
  }

  deleteTitle(id) {
    return this.http.delete(this.routes.deletePath(id)).pipe(
      map((res: any) => res),
     
    );
  }
  
}

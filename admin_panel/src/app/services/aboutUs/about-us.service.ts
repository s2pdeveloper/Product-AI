import { Injectable } from '@angular/core';
import { map,  } from 'rxjs/operators';
import { ApiService } from '../../core/services/httpApi.service';
@Injectable({
  providedIn: 'root'
})
export class AboutUsService {
  routes: any = {
    createPath: `aboutUs/`,
    getAllPath: ({ page, pageSize, search }) =>
      `aboutUs/?page=${page}&pagesize=${pageSize}&search=${search}`,
    updatePath: (id) => `aboutUs/${id}`,
    getByIdPath: (id) => `aboutUs`,
    deletePath: (id) => `aboutUs/${id}`,
  };
  constructor(private http: ApiService) { }

  createAboutUs(payload) {
    return this.http.post(this.routes.createPath, payload).pipe(
       map((res: any) => res),
     
    );
  }

  getAllAboutUs(payload) {
    return this.http.get(this.routes.getAllPath(payload)).pipe(
      map((res: any) => res),
     
    );
  }

  updateAboutUs(id, payload) {
    return this.http.put(this.routes.updatePath(id), payload).pipe(
      map((res: any) => res),
     
    );
  }

  getAboutUsById() {
    return this.http.get(this.routes.getByIdPath()).pipe(
      map((res: any) => res),
     
    );
  }

  deleteAboutUs(id) {
    return this.http.delete(this.routes.deletePath(id)).pipe(
      map((res: any) => res),
     
    );
  }
  
}

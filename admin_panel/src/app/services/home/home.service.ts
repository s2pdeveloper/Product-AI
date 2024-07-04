import { Injectable } from '@angular/core';
import { map,  } from 'rxjs/operators';
import { ApiService } from '../../core/services/httpApi.service';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  routes: any = {
    createPath: `home/`,
    getAllPath: ({ page, pageSize, search }) =>
      `home/?page=${page}&pagesize=${pageSize}&search=${search}`,
    updatePath: (id) => `home/${id}`,
    getByIdPath: () => `home`,
    deletePath: (id) => `home/${id}`,
  };
  constructor(private http: ApiService) { }
  createHome(payload) {
    return this.http.post(this.routes.createPath, payload).pipe(
       map((res: any) => res),
     
    );
  }

  getAllHome(payload) {
    return this.http.get(this.routes.getAllPath(payload)).pipe(
      map((res: any) => res),
     
    );
  }

  updateHome(id, payload) {
    return this.http.put(this.routes.updatePath(id), payload).pipe(
      map((res: any) => res),
     
    );
  }

  getHomeById() {
    return this.http.get(this.routes.getByIdPath()).pipe(
      map((res: any) => res),
     
    );
  }

  deleteHome(id) {
    return this.http.delete(this.routes.deletePath(id)).pipe(
      map((res: any) => res),
     
    );
  }
  
}

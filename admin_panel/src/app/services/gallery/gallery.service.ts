import { Injectable } from '@angular/core';
import { map,  } from 'rxjs/operators';
import { ApiService } from '../../core/services/httpApi.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  routes: any = {
    createPath: `gallery/create`,
    getAllPath: ({ page, pageSize, search }) =>
      `gallery/getAll?page=${page}&pagesize=${pageSize}&search=${search}`,
    updatePath: (id) => `gallery/${id}`,
    getByIdPath: (id) => `gallery/${id}`,
    deletePath: (id) => `gallery/${id}`,
  };

  constructor(private http: ApiService) { }
  createGallery(payload) {
    return this.http.post(this.routes.createPath, payload).pipe(
       map((res: any) => res),
      
    );
  }

  getGalleryListing(payload) {
    return this.http.get(this.routes.getAllPath(payload)).pipe(
      map((res: any) => res),
      
    );
  }

  updateGallery(id, payload) {
    return this.http.put(this.routes.updatePath(id), payload).pipe(
      map((res: any) => res),
      
    );
  }

  getGalleryById(id) {
    return this.http.get(this.routes.getByIdPath(id)).pipe(
      map((res: any) => res),
      
    );
  }

  deleteGallery(id) {
    return this.http.delete(this.routes.deletePath(id)).pipe(
      map((res: any) => res),
      
    );
  }
}

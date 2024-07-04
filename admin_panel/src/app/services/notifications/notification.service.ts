import { Injectable } from '@angular/core';
import { map,  } from 'rxjs/operators';
import { ApiService } from '../../core/services/httpApi.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  routes: any = {
    createPath: `notification/create`,
    getAllPath: ({ page, pageSize, search }) =>
      `notification/getAll?page=${page}&pagesize=${pageSize}&search=${search}`,
    updatePath: (id) => `notification/update/${id}`,
    getByIdPath: (id) => `notification/getById/${id}`,
    deletePath: (id) => `notification/${id}`,
  };
  constructor(private http: ApiService) {}

  createNotification(payload) {
    return this.http.post(this.routes.createPath, payload).pipe(
       map((res: any) => res),
      
    );
  }

  getNotificationListing(payload) {
    return this.http.get(this.routes.getAllPath(payload)).pipe(
      map((res: any) => res),
      
    );
  }

  updateNotification(id, payload) {
    return this.http.put(this.routes.updatePath(id), payload).pipe(
      map((res: any) => res),
      
    );
  }

  getNotificationById(id) {
    return this.http.get(this.routes.getByIdPath(id)).pipe(
      map((res: any) => res),
      
    );
  }

  deleteNotification(id) {
    return this.http.delete(this.routes.deletePath(id)).pipe(
      map((res: any) => res),
      
    );
  }
}

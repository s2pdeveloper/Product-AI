import { Injectable } from '@angular/core';
import { map,  } from 'rxjs/operators';
import { ApiService } from '../../core/services/httpApi.service';

@Injectable({
  providedIn: 'root'
})

export class StudentAchievementService {
  routes: any = {
    createPath: `studentAchievement/`,
    getAllPath: ({ page, pageSize, search }) =>
      `studentAchievement/?page=${page}&pagesize=${pageSize}&search=${search}`,
    updatePath: (id) => `studentAchievement/${id}`,
    getByIdPath: (id) => `studentAchievement/${id}`,
    deletePath: (id) => `studentAchievement/${id}`,
  };
  constructor(private http: ApiService) {}

  createStudentAchievement(payload) {
    return this.http.post(this.routes.createPath, payload).pipe(
       map((res: any) => res),
     
    );
  }

  getAllStudentAchievement(payload) {
    return this.http.get(this.routes.getAllPath(payload)).pipe(
      map((res: any) => res),
     
    );
  }

  updateStudentAchievement(id, payload) {
    return this.http.put(this.routes.updatePath(id), payload).pipe(
      map((res: any) => res),
     
    );
  }

  getStudentAchievementById(id) {
    return this.http.get(this.routes.getByIdPath(id)).pipe(
      map((res: any) => res),
     
    );
  }

  deleteStudentAchievement(id) {
    return this.http.delete(this.routes.deletePath(id)).pipe(
      map((res: any) => res),
     
    );
  }
  
}
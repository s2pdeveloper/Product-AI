import { Injectable } from '@angular/core';
import { map,  } from 'rxjs/operators';
import { ApiService } from '../../core/services/httpApi.service';
@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  routes: any = {
    createPath: `testimonial/create`,
    getAllPath: ({ page, pageSize, search }) =>
      `testimonial/getAll?page=${page}&pagesize=${pageSize}&search=${search}`,
    updatePath: (id) => `testimonial/${id}`,
    getByIdPath: (id) => `testimonial/${id}`,
    deletePath: (id) => `testimonial/${id}`,
  };
  constructor(private http: ApiService) { }
  createTestimonial(payload) {
    return this.http.post(this.routes.createPath, payload).pipe(
       map((res: any) => res),
      
    );
  }

  getTestimonialListing(payload) {
    return this.http.get(this.routes.getAllPath(payload)).pipe(
      map((res: any) => res),
      
    );
  }

  updateTestimonial(id, payload) {
    return this.http.put(this.routes.updatePath(id), payload).pipe(
      map((res: any) => res),
      
    );
  }

  getTestimonialById(id) {
    return this.http.get(this.routes.getByIdPath(id)).pipe(
      map((res: any) => res),
      
    );
  }

  deleteTestimonial(id) {
    return this.http.delete(this.routes.deletePath(id)).pipe(
      map((res: any) => res),
      
    );
  }
}


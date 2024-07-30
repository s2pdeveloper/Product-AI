import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
categoryUrl = "http://localhost:2025/api/v1/admin/category/getAll";


  constructor( private http:HttpClient) { }
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.categoryUrl);
  }

  getProductsByCategory(categoryId: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:2025/api/v1/admin/product/getAllByCategoryId/${categoryId}`);
    
  }

  // submitData(formData: FormData): Observable<any> {
  //   return this.http.post<any>('http://localhost:2025/api/v1/admin/gpt/generateDescription', formData);
  // }
  submitData(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:2025/api/v1/admin/gpt/generateDescription', formData, {
        observe: "events",
        responseType: "text",
        reportProgress: true
    });
  }
  
  
}



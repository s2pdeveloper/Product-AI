import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor( private http:HttpClient) { }
  users(){
    return this.http.get('')
  }
}

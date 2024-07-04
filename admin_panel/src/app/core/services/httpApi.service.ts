import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  constructor(private httpClient: HttpClient) {}

  private getBaseUrl() {
    return `${location.protocol}//${
      location.hostname + (location.port ? ':' + location.port : '')
    }/`;
  }

  public get(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.httpClient.get(path, { params }).pipe(
      map((res: any) => res.result)
      // tap((_) => this.log(path))
    );
  }

  public put(path: string, body: object = {}): Observable<any> {
    return this.httpClient.put(path, body).pipe(map((res: any) => res.result));
  }

  public post(path: string, body: object = {}): Observable<any> {
    return this.httpClient.post(path, body).pipe(map((res: any) => res.result));
  }

  public delete(path: string): Observable<any> {
    return this.httpClient.delete(path).pipe(map((res: any) => res.result));
  }

  public getFile(path: string) {
    return this.httpClient.get(path, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }

  public formatErrors(error: any): Observable<any> {
    return throwError(error.error);
  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // console.log(message);
  }
}

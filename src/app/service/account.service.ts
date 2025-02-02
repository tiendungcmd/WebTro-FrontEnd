import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:7202/api/';
  constructor(private http: HttpClient) { }
  private currentUserSource = new BehaviorSubject<User | any>(null);
  currentUser$ = this.currentUserSource.asObservable();

  init() {
    return this.currentUser$;
  }

  login(request: any): Observable<any> {
    return this.http.post<User>(this.baseUrl + 'auth/login', request);
  }
  register(request: User): Observable<any> {
    return this.http.post<User>(this.baseUrl + 'auth/', request);
  }
  logout() {
    this.currentUserSource.next(null);
  }

  getCurrentUser(): Observable<any> {
    return this.currentUserSource.asObservable();
  }

  getProfile(request: any): Observable<any>  {
    return this.http.get<User>(this.baseUrl + 'auth/profile?userName=' + request);
  }

  updateProfile(request: any): Observable<any>  {
    return this.http.post<User>(this.baseUrl + 'auth/profile', request);
  }

  getListUser() : Observable<any> {
    return this.http.get<User>(this.baseUrl + 'auth');
  }

  lockUser(id:any): Observable<any> {
    return this.http.post<User>(this.baseUrl + 'auth/lockAccount?id='+id,"");
  }

  resetPassword(id:any): Observable<any> {
    return this.http.post<User>(this.baseUrl + 'auth/resetPassword?id='+id,"");
  }
}

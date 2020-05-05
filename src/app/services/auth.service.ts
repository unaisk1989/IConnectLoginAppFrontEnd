import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

login(data): Observable<any> {
  return this.http.post('http://localhost:3000/api/login', data);
}


signup(data): Observable<any> {
  return this.http.post('http://localhost:3000/api/signup' , data);
}


public isLoggedIn(): boolean {
  let status = false;
  if (localStorage.getItem('isLoggedIn') === 'true') {
     status = true;
  } else {
     status = false;
     }
  return status;
}


logout() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
  }

}

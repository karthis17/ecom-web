import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  loggedIn = new BehaviorSubject<boolean>(false);
  logState: Observable<boolean> = this.loggedIn.asObservable();
  endpoint = 'http://localhost:3000/api/user';
  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true };

  constructor(private http: HttpClient) {
    this.checkUserLogState();
  }

  userRegister(data: object) {
    return new Promise<any>((resolve, reject) => {
      this.http.post(this.endpoint + '/register', JSON.stringify(data), this._options).subscribe(
        (response: any) => {
          if (response.success) {
            this.loggedIn.next(true);
            localStorage.setItem('loggedIn', 'true');
            resolve(response);
          } else {
            console.log(response);
            resolve(response);
          }
        },
        (error: any) => {
          console.error('Login failed:', error);
          reject(error);
        }
      );
    })
  }

  userLogin(user: any) {

    return new Promise<any>((resolve, reject) => {

      this.http.post(this.endpoint + '/login', JSON.stringify(user), this._options).subscribe(
        (response: any) => {
          if (response.success) {
            this.loggedIn.next(true);
            localStorage.setItem('loggedIn', 'true');
            resolve(response);
          } else {
            console.log(response);
            resolve(response);
          }
        }, (err) => {
          reject(err);
        });

    })

  }


  addUserLocally(user: any): void {
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout(): void {

    localStorage.clear();
    this.loggedIn.next(false);
  }

  checkUserLogState(): void {
    const loggedIn = localStorage.getItem('loggedIn');

    if (loggedIn === 'true') {
      this.loggedIn.next(true);
    }
  }

  getUser() {
    return this.http.get(this.endpoint + '/get-user', { withCredentials: true })
  }



}




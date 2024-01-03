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
  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) {
    this.checkUserLogState();
  }

  userRegister(data: object) {
    return new Promise<any>((resolve, reject) => {
      this.http.post(this.endpoint + '/register', JSON.stringify(data), this._options).subscribe(
        (response: any) => {
          if (response.success) {
            this.loggedIn.next(true);
            console.log(response);
            this.addUserLocally(response); // Add user information to localStorage
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
            console.log(response);
            this.addUserLocally(response); // Add user information to localStorage
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
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    this.loggedIn.next(false);
  }

  checkUserLogState(): void {
    const loggedIn = localStorage.getItem('loggedIn');
    const user = localStorage.getItem('user');

    if (loggedIn === 'true' && user) {
      this.loggedIn.next(true);
    }
  }

  async getUser() {
    const user = localStorage.getItem('user');
    return user ? await JSON.parse(user) : null;
  }
}




import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(private http: HttpClient, private router: Router) { }
  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true };

  adminLogin(data: any) {
    return this.http.post('http://localhost:3000/admin', data, this._options)
  }

  checkLogin() {
    return new Promise<boolean>((resolve, reject) => {
      this.http.get('http://localhost:3000/user', { withCredentials: true }).subscribe(res => {
        resolve(true);
      }, err => reject(false));
    })
  }

  nav() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        isAdmin: true
      }
    };
    this.router.navigate(['/admin', 'login'], navigationExtras);
  }

}

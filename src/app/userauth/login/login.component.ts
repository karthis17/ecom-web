import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminAuthService } from '../../service/admin-auth.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isAdmin!: boolean;
  requiredErr: string[] = [];

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, private adminAuth: AdminAuthService) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.isAdmin = params['isAdmin'] === 'true';
      console.log(params['isAdmin']);
    });
  }


  email = new FormControl("", [Validators.required, Validators.email]);
  password = new FormControl("", Validators.required);

  submit() {
    if (this.email.valid && this.password.valid) {
      this.authService.userLogin({ email: this.email.value, password: this.password.value }).then((res) => {
        console.log('User registration', res);
        if (res.success) {
          this.router.navigateByUrl('');
        } else {
          this.requiredErr[0] = res.err;
          this.requiredErr[1] = res.message;
        }
      });
    }
    else if (!this.email.valid && !this.password.valid) {
      this.requiredErr[0] = 'both';
      this.requiredErr[1] = 'Please fill all required fields'
    } else if (!this.email.valid) {
      this.requiredErr[0] = 'email';
      this.requiredErr[1] = 'Enter valid email format';

    } else {
      this.requiredErr[0] = 'password';
      this.requiredErr[1] = 'Enter Your Password, it is required';
    }

  }

  adminSumbmit() {
    console.log('Admin');
    this.adminAuth.adminLogin({ username: this.email.value, password: this.password.value }).subscribe((res: any) => {
      if (res) {
        console.log('User registration', res);
        this.router.navigate(['/admin']);
      }
      console.log('User registration', res);
    }, err => { console.log('User registration', err); });
  }

}

import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) { }

  email = new FormControl("", [Validators.required, Validators.email]);
  password = new FormControl("", Validators.required);

  submit() {
    if (this.email.valid && this.password.valid) {
      this.authService.userLogin({ email: this.email.value, password: this.password.value }).then((res) => {
        console.log('User registration', res);
        if (res.success) {
          this.router.navigateByUrl('');
        }
      });
    }
  }

}

import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authService: AuthService, private router: Router) { }

  name = new FormControl("", Validators.required);
  email = new FormControl("", [Validators.required, Validators.email]);
  password = new FormControl("", Validators.required);

  submit() {
    if (this.name.valid && this.email.valid && this.password.valid) {
      this.authService.userRegister({ name: this.name.value, email: this.email.value, password: this.password.value }).then((res) => {
        console.log('User registration', res);
        if (res.success) {
          this.router.navigateByUrl('');
        }
      });
    }
  }

}

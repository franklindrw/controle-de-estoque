import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupUserReq } from 'src/app/models/interfaces/user/SignupUserReq';
import { AuthReq } from 'src/app/models/interfaces/user/auth/AuthReq';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService, private cookieService: CookieService) { }

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as AuthReq)
        .subscribe({
          next: (resp) => {
            if (resp) {
              this.cookieService.set(environment.AUTH_TOKEN, resp?.token);
              this.loginForm.reset();
            }
          },
          error: (err) => console.log(err)
        })
    }
  }

  onSubmitSignupForm(): void {
    if (this.signupForm.value && this.signupForm.valid) {
      this.userService.signupUser(this.signupForm.value as SignupUserReq)
        .subscribe({
          next: (resp) => {
            if (resp) {
              alert('Usuário teste criado com sucesso!')
              this.signupForm.reset();
              this.loginCard = true;
            }
          },
          error: (err) => console.log(err)
        })
    }
  }
}

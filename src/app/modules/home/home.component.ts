import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupUserReq } from 'src/app/models/interfaces/user/SignupUserReq';
import { AuthReq } from 'src/app/models/interfaces/user/auth/AuthReq';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

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

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as AuthReq)
        .subscribe({
          next: (resp) => {
            if (resp) {
              this.cookieService.set(environment.AUTH_TOKEN, resp?.token);
              this.loginForm.reset();
              this.router.navigate(['/dashboard']);

              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Olá, ${resp?.name}`,
                life: 2000, // 2 segundos
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Ops! Erro ao fazer login',
              detail: 'verifique seu usuário e senha e tente novamente',
              life: 2000, // 2 segundos
            })
            console.error(err)
          }
        })
    }
  }

  onSubmitSignupForm(): void {
    if (this.signupForm.value && this.signupForm.valid) {
      this.userService.signupUser(this.signupForm.value as SignupUserReq)
        .subscribe({
          next: (resp) => {
            if (resp) {
              this.signupForm.reset();
              this.loginCard = true;

              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Usuário criado com sucesso!`,
                life: 2000, // 2 segundos
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Ops!',
              detail: 'Erro ao cadastrar o usuário',
              life: 2000, // 2 segundos
            })
            console.error(err)
          }
        })
    }
  }
}

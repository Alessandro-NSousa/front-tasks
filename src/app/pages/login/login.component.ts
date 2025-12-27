import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl<string>('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    password: new FormControl<string>('', { validators: [Validators.required, Validators.minLength(6)], nonNullable: true })
  });

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastrService: ToastrService
  ) {}

  submit() {
    const { email, password } = this.loginForm.value;

    this.loginService.login(email!, password!).subscribe({
      next: () => {
        this.toastrService.success("Login feito com sucesso!");
        this.router.navigate(['/tarefa/list']);
      },
      error: () =>
        this.toastrService.error("Erro inesperado, tente novamente mais tarde!")
    });
  }

  navigate() {
    this.router.navigate(["/signup"]);
  }

}

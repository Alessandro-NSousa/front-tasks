import { Component, computed } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { PrimarySelectComponent } from '../primary-select/primary-select.component';

interface SignupForm {
  nome: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  passwordConfirm: FormControl<string | null>;
  role: FormControl<String | null>;
}

@Component({
  selector: 'app-user-form-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PrimaryInputComponent,
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    PrimarySelectComponent
  ],
  templateUrl: './user-form-dialog.component.html',
  styleUrl: './user-form-dialog.component.scss'
})
export class UserFormDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<UserFormDialogComponent>
  ) { }

  signupForm = new FormGroup<SignupForm>(
  {
    nome: new FormControl('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true }),
    email: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)], nonNullable: true }),
    passwordConfirm: new FormControl('', { validators: [Validators.required, Validators.minLength(6)], nonNullable: true }),
    role: new FormControl<'ADMIN' | 'USER'>('USER', { validators: [Validators.required], nonNullable: true }) 
  },
    { validators: this.passwordsMatchValidator }
  );

  passwordsMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirm = form.get('passwordConfirm')?.value;

    return password === confirm ? null : { passwordMismatch: true };
  }
  
  get passwordMismatch() {
    return (
      this.signupForm.hasError('passwordMismatch') &&
      (this.signupForm.controls.passwordConfirm.touched ||
      this.signupForm.controls.passwordConfirm.dirty)
    );
  }

  submit() {
    if (this.signupForm.invalid) return;

    this.dialogRef.close(this.signupForm.getRawValue());
  }
}

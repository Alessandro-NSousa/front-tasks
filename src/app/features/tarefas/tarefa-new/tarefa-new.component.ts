import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PrimaryInputComponent } from '../../../components/primary-input/primary-input.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PrimarySelectComponent } from '../../../components/primary-select/primary-select.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

interface SignupForm {
  titulo: FormControl<string | null>;
  descricao: FormControl<string | null>;
  status: FormControl<string | null>;
  passwordConfirm: FormControl<string | null>;
  role: FormControl<String | null>;
}

@Component({
  selector: 'app-tarefa-new',
  imports: [
    ReactiveFormsModule,
    PrimaryInputComponent,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    PrimarySelectComponent,
    CKEditorModule
  ],
  templateUrl: './tarefa-new.component.html',
  styleUrl: './tarefa-new.component.scss'
})
export class TarefaNewComponent {

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

}

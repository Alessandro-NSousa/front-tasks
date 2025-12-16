import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../../components/primary-input/primary-input.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PrimarySelectComponent } from '../../../components/primary-select/primary-select.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UsersService } from '../../users/users.service';
import { map } from 'rxjs';

interface SignupForm {
  titulo: FormControl<string | null>;
  descricao: FormControl<string | null>;
  status: FormControl<string | null>;
  colaboradorId: FormControl<string | null>
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
  
  signupForm!: FormGroup;
  colaboradoresOptions: { value: string; label: string }[] = [];
  statusOptions: { value: string; label: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UsersService
  ) { }
  
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      colaboradorId: [null, Validators.required],
      titulo: new FormControl('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true }),
      descricao: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: false }),
      status: new FormControl('', { nonNullable: false })
    });

    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.userService
  .listarUsuarios(0, 50, 'nome,asc')
  .pipe(
    map(page =>
      page.content.map(user => ({
        value: String(user.id),  // Garantir que é uma string
        label: user.nome
      }))
    )
  )
  .subscribe(options => {
    this.colaboradoresOptions = options;
  });
  }

  // signupForm = new FormGroup<SignupForm>(
  // {
  //   titulo: new FormControl('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true }),
  //   descricao: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: false }),
  //   status: new FormControl('', { nonNullable: false }),
  //   colaboradorId: new FormControl('', { nonNullable: false })
  // }
  // );

}

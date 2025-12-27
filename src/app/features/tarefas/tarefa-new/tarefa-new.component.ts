import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../../components/primary-input/primary-input.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PrimarySelectComponent } from '../../../components/primary-select/primary-select.component';
import { UsersService } from '../../users/users.service';
import { map } from 'rxjs';
import type { Editor } from '@ckeditor/ckeditor5-core';
import { CkeditorUploadAdapter } from '../../../shared/ckeditor-upload.adapter';
import { TarefasService } from '../tarefas.service';

interface SignupForm {
  titulo: FormControl<string | null>;
  descricao: FormControl<string | null>;
  status: FormControl<string | null>;
  colaboradorId: FormControl<string | null>
}

declare const ClassicEditor: any;

@Component({
  selector: 'app-tarefa-new',
  imports: [
    ReactiveFormsModule,
    PrimaryInputComponent,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    PrimarySelectComponent
  ],
  templateUrl: './tarefa-new.component.html',
  styleUrl: './tarefa-new.component.scss'
})
export class TarefaNewComponent implements OnInit, AfterViewInit {

  @ViewChild('editor') editorElement!: ElementRef;
  private editorInstance!: Editor;

  signupForm!: FormGroup;

  colaboradoresOptions: { value: string; label: string }[] = [];
  statusOptions = [
    { value: 'PENDENTE', label: 'Pendente' },
    { value: 'ANDAMENTO', label: 'Em andamento' },
    { value: 'CONCLUIDA', label: 'Concluída' }
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private tarefasService: TarefasService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', Validators.required],
      status: ['', Validators.required],
      colaboradorId: ['', Validators.required]
    });

    this.carregarUsuarios();
  }

  ngAfterViewInit(): void {
    ClassicEditor.create(this.editorElement.nativeElement)
      .then((editor: any) => {
        this.editorInstance = editor;

        editor.plugins.get('FileRepository').createUploadAdapter =
          (loader: any) => new CkeditorUploadAdapter(loader);

        editor.model.document.on('change:data', () => {
          this.signupForm.get('descricao')!
            .setValue(editor.getData(), { emitEvent: false });
        });
      })
      .catch(console.error);
  }

  carregarUsuarios(): void {
    this.userService
      .listarUsuarios(0, 50, 'nome,asc')
      .pipe(
        map(page =>
          page.content.map(user => ({
            value: String(user.id),
            label: user.nome
          }))
        )
      )
      .subscribe(options => {
        this.colaboradoresOptions = options;
      });
  }

  salvar(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const payload = {
      titulo: this.signupForm.value.titulo,
      descricao: this.signupForm.value.descricao,
      status: this.signupForm.value.status,
      colaboradorId: this.signupForm.value.colaboradorId
    };

    this.tarefasService.cadastrarTarefa(payload).subscribe({
      next: () => {
        this.signupForm.reset();
        this.editorInstance.setData('');
      },
      error: err => console.error(err)
    });
  }
}

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TarefasService } from '../tarefas.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../users/users.service';
import { Editor } from '@ckeditor/ckeditor5-core';
import { CkeditorUploadAdapter } from '../../../shared/ckeditor-upload.adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { ToastrService } from 'ngx-toastr';

declare const ClassicEditor: any;

interface EditForm {
  titulo: FormControl<string | null>;
  descricao: FormControl<string | null>;
  status: FormControl<string | null>;
  colaboradorId: FormControl<string | null>;
}

@Component({
  selector: 'app-tarefa-edit',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDivider,
    MatIcon,
    MatCardModule
  ],
  templateUrl: './tarefa-edit.component.html',
  styleUrl: './tarefa-edit.component.scss'
})
export class TarefaEditComponent implements OnInit, AfterViewInit {

  @ViewChild('editor') editorElement!: ElementRef;
  private editorInstance!: Editor;

  form!: FormGroup<EditForm>;
  tarefaId!: string;

  colaboradoresOptions: { value: string; label: string }[] = [];
  statusOptions = [
    { value: 'PENDENTE', label: 'Pendente' },
    { value: 'ANDAMENTO', label: 'Em andamento' },
    { value: 'CONCLUIDO', label: 'Concluída' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tarefasService: TarefasService,
    private usersService: UsersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.tarefaId = this.route.snapshot.paramMap.get('id')!;

    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', Validators.required],
      status: ['', Validators.required],
      colaboradorId: ['', Validators.required]
    });

    this.carregarUsuarios();
    this.carregarTarefa();
  }

  ngAfterViewInit(): void {
    ClassicEditor.create(this.editorElement.nativeElement)
      .then((editor: any) => {
        this.editorInstance = editor;

        editor.plugins.get('FileRepository').createUploadAdapter =
          (loader: any) => new CkeditorUploadAdapter(loader);

        editor.model.document.on('change:data', () => {
          this.form.get('descricao')!
            .setValue(editor.getData(), { emitEvent: false });
        });
      })
      .catch(console.error);
  }

  carregarUsuarios(): void {
    this.usersService
      .listarUsuarios(0, 50, 'nome,asc')
      .subscribe(res => {
        this.colaboradoresOptions = res.content.map(user => ({
          value: String(user.id),
          label: user.nome
        }));
      });
  }

   carregarTarefa(): void {
    this.tarefasService.buscarPorId(this.tarefaId).subscribe(tarefa => {

      this.form.patchValue({
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
        status: tarefa.status,
        colaboradorId: tarefa.colaborador?.id ?? null
      });

      // Atualiza o CKEditor se já estiver inicializado
      if (this.editorInstance) {
        this.editorInstance.setData(tarefa.descricao);
      }
    });
  }

  salvar(): void {
    if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const payload = {
    titulo: this.form.value.titulo!,
    descricao: this.form.value.descricao!,
    status: this.form.value.status!,
    colaboradorId: this.form.value.colaboradorId!
  };

  this.tarefasService.editarTarefa(this.tarefaId, payload).subscribe({
    next: () => {
      this.router.navigate(['/tarefa/list']);
      this.toastr.success(
            'Alterações realizadas com sucesso!',
            'Sucesso'
          );
     },
    error: err => console.error('Erro ao atualizar tarefa', err)
    });
  }

  cancelar(): void {
    this.router.navigate(['/tarefa/list']);
  }

}

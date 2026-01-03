import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe, CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TarefasService } from '../tarefas.service';

@Component({
  selector: 'app-tarefa-view-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    DatePipe,
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './tarefa-view-dialog.component.html',
  styleUrl: './tarefa-view-dialog.component.scss'
})
export class TarefaViewDialogComponent {

  tarefa: any;
  descricaoSanitizada!: SafeHtml;
  expandido = false;

  statusOptions = [
    { value: 'PENDENTE', label: 'Pendente' },
    { value: 'ANDAMENTO', label: 'Em andamento' },
    { value: 'CONCLUIDO', label: 'Concluída' }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private dialogRef: MatDialogRef<TarefaViewDialogComponent>,
    private tarefaService: TarefasService,
    private sanitizer: DomSanitizer
  ) {
    this.carregarTarefa();
  }

  carregarTarefa(): void {
    this.tarefaService.buscarPorId(this.data.id).subscribe(tarefa => {
      this.tarefa = tarefa;
      this.descricaoSanitizada =
        this.sanitizer.bypassSecurityTrustHtml(this.tarefa.descricao);
    });
  }

  toggleExpandir(): void {
    this.expandido = !this.expandido;

    this.dialogRef.updateSize(
      this.expandido ? '95vw' : '800px',
      this.expandido ? '95vh' : ''
    );
  }

  fechar(): void {
    this.dialogRef.close();
  }

  getStatusLabel(status: string): string {
    return (
      this.statusOptions.find(s => s.value === status)?.label
      ?? status
    );
  }
  
  getStatusClass(status: string): string {
  switch (status) {
    case 'PENDENTE':
      return 'dangerIcon';
    case 'ANDAMENTO':
      return 'primaryIcon';
    case 'CONCLUIDO':
      return 'doneIcon';
    default:
      return 'secondaryIcon';
  }
}




}
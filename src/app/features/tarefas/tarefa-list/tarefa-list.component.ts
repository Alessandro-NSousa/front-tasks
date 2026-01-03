import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TarefasService } from '../tarefas.service';
import { Tarefa } from '../tarefa';
import { TarefaViewDialogComponent } from '../tarefa-view-dialog/tarefa-view-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tarefa-list',
  imports: [MatTableModule,
    MatPaginatorModule,
    DatePipe,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    ConfirmDialogComponent
  ],
  templateUrl: './tarefa-list.component.html',
  styleUrl: './tarefa-list.component.scss'
})
export class TarefaListComponent {
  displayedColumns: string[] = ['id', 'titulo', 'status', 'criacao', 'colaborador', 'acoes'];
  statusOptions = [
    { value: 'PENDENTE', label: 'Pendente' },
    { value: 'ANDAMENTO', label: 'Em andamento' },
    { value: 'CONCLUIDO', label: 'Concluída' }
  ];
 
  dataSource = new MatTableDataSource<Tarefa>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private tarefaService: TarefasService,
    private dialog: MatDialog,
    private toatrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.carregarTarefas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    
  }

  carregarTarefas(): void {
    this.tarefaService.listarTarefas().subscribe({
      next: (res) => {
        this.dataSource.data = res.content;
      },
      error: (err) => {
        console.error('Erro ao carregar tarefas:', err);
      }
    });
  }

  excluir(id: number): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '400px',
    data: {
      titulo: 'Excluir tarefa',
      mensagem: 'Tem certeza que deseja excluir esta tarefa?'
    }
  });

  dialogRef.afterClosed().subscribe(confirmado => {
    if (!confirmado) return;

      this.tarefaService.excluir(id).subscribe({
        next: () => {
          this.toatrService.success(
            'Tarefa excluída com sucesso!',
            'Sucesso'
          );
          this.carregarTarefas();
        },
        error: () => {
          this.toatrService.error(
            'Não foi possível excluir a tarefa.',
            'Erro'
          );
        }
      });
    });
  }
  
  visualizar(id: string): void {
    this.dialog.open(TarefaViewDialogComponent, {
      width: '800px',
      maxWidth: '95vw',
      data: { id }
    });
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

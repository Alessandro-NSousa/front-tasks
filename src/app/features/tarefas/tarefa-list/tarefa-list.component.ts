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

@Component({
  selector: 'app-tarefa-list',
  imports: [MatTableModule,
    MatPaginatorModule,
    DatePipe,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './tarefa-list.component.html',
  styleUrl: './tarefa-list.component.scss'
})
export class TarefaListComponent {
  displayedColumns: string[] = ['id', 'titulo', 'status', 'criacao', 'colaborador', 'acoes'];
 
  dataSource = new MatTableDataSource<Tarefa>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tarefaService: TarefasService, private dialog: MatDialog) { }

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
  if (confirm('Deseja realmente excluir esta tarefa?')) {
    this.tarefaService.excluir(id).subscribe({
      next: () => {
        this.carregarTarefas();
      },
      error: () => {
        alert('Erro ao excluir a tarefa');
      }
    });
  }
  }
  
  visualizar(id: string): void {
    this.dialog.open(TarefaViewDialogComponent, {
      width: '800px',
      maxWidth: '95vw',
      data: { id }
    });
  }

}

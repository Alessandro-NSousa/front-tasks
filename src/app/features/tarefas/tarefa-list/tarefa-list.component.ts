import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TarefasService } from '../tarefas.service';
import { Tarefa } from '../tarefa';

@Component({
  selector: 'app-tarefa-list',
  imports: [MatTableModule, MatPaginatorModule, DatePipe, MatCheckboxModule,MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './tarefa-list.component.html',
  styleUrl: './tarefa-list.component.scss'
})
export class TarefaListComponent {
  displayedColumns: string[] = ['id', 'titulo', 'descricao', 'status', 'criacao', 'colaborador'];
 
  dataSource = new MatTableDataSource<Tarefa>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tarefaService: TarefasService) { }

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

}

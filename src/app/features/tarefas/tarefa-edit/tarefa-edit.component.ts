import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TarefasService } from '../tarefas.service';

@Component({
  selector: 'app-tarefa-edit',
  imports: [CommonModule],
  templateUrl: './tarefa-edit.component.html',
  styleUrl: './tarefa-edit.component.scss'
})
export class TarefaEditComponent {

  tarefa: any;

  constructor(
    private route: ActivatedRoute,
    private tarefasService: TarefasService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.tarefasService.buscarPorId(id).subscribe({
        next: tarefa => {
          this.tarefa = tarefa;
        },
        error: err => console.error('Erro ao carregar tarefa', err)
      });
    }
  }

}

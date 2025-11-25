import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarefa } from './tarefa';

export interface TarefaDTO {
  id: number;
  titulo: string;
  descricao: string;
  status: string;
  criacao: Date;
  colaborador: string;
}

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  private apiUrl = 'http://localhost:8080/api/tarefas';

  constructor(private http: HttpClient) { }
  
  listarTarefas(): Observable<{ content: Tarefa[] }> {
    return this.http.get<{ content: Tarefa[] }>(this.apiUrl);
  }

  cadastrarUsuario(dto: TarefaDTO): Observable<void> {
    console.log("dados: ", dto)
    return this.http.post<void>(this.apiUrl, dto);
  }
}

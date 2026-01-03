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

export interface CadastrarTarefaRequest {
  titulo: string;
  descricao: string;
  status: string;
  colaboradorId: string;
}

export interface EditarTarefaRequest {
  titulo: string;
  descricao: string;
  status: string;
  colaboradorId: string;
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

  cadastrarTarefa(payload: CadastrarTarefaRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, payload);
  }

  cadastrarUsuario(dto: TarefaDTO): Observable<void> {
    return this.http.post<void>(this.apiUrl, dto);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarPorId(id: string): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.apiUrl}/${id}`);
  }

  editarTarefa(tarefaId: string, payload: EditarTarefaRequest): Observable<void> {
    console.log("dados: ", payload)
    return this.http.put<void>(`${this.apiUrl}/${tarefaId}`, payload);
  }
}

import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Page } from '../../models/page.model';

export interface UserDTO {
  id: number;
  nome: string;
  email: string;
  role: string;
  ativo: boolean;
}

export interface UserRequestDTO {
  nome: string;
  email: string;
  senha: string
}

export interface UserResponseDto {
  id: string;
  nome: string;
  email: string;
  ativo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.urlAuth;
  constructor(private http: HttpClient) { }
  
  // listarUsuarios(): Observable<{ content: User[] }> {
  //   return this.http.get<{ content: User[] }>(`${this.apiUrl}/auth`);
  // }

  listarUsuarios(page: number, size: number, sort: string) {
    return this.http.get<Page<User>>(
      `${this.apiUrl}/auth`,
      {
        params: {
          page,
          size,
          sort
        }
      }
    );
  }

  cadastrarUsuario(dto: UserRequestDTO): Observable<void> {
    console.log("dados: ", dto)
    return this.http.post<void>(`${this.apiUrl}/auth/register`, dto);
  }

  excluirUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/auth/${id}`);
  }
  buscarUserPorId(id: string): Observable<User> {
      return this.http.get<User>(`${this.apiUrl}/auth/${id}`);
    }

  
  
}

import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserDTO {
  id: number;
  nome: string;
  email: string;
  role: string;
  ativo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }
  
  listarUsuarios(): Observable<{ content: User[] }> {
    return this.http.get<{ content: User[] }>(this.apiUrl);
  }

  cadastrarUsuario(dto: UserDTO): Observable<void> {
    console.log("dados: ", dto)
    return this.http.post<void>(this.apiUrl, dto);
  }
  
}

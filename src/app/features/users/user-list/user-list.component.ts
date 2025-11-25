import { Component, ViewChild } from '@angular/core';
import { User } from '../user';
import { UsersService } from '../users.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [MatTableModule, MatPaginatorModule, DatePipe, MatCheckboxModule, MatIconModule,RouterModule, MatButtonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  displayedColumns: string[] = ['id', 'nome', 'email', 'role', 'ativo'];
 
  dataSource = new MatTableDataSource<User>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    
  }

  loadUsers(): void {
    this.userService.listarUsuarios().subscribe({
      next: (res) => {
        this.dataSource.data = res.content;
      },
      error: (err) => {
        console.error('Erro ao carregar usuários:', err);
      }
    });
  }



}

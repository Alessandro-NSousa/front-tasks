import { Component, ViewChild } from '@angular/core';
import { User } from '../user';
import { UsersService } from '../users.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { DatePipe, NgClass } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserFormDialogComponent } from '../../../components/user-form-dialog/user-form-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { TarefaViewDialogComponent } from '../../tarefas/tarefa-view-dialog/tarefa-view-dialog.component';
import { UserWiewDialogComponent } from '../user-wiew-dialog/user-wiew-dialog.component';

@Component({
  selector: 'app-user-list',
  imports: [MatTableModule, MatPaginatorModule,
    DatePipe, MatCheckboxModule,
    MatIconModule, RouterModule,
    MatButtonModule, MatDialogModule, MatSortModule, NgClass],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  displayedColumns: string[] = ['id', 'nome', 'email', 'role', 'acoes'];
  roleOptions = [
    { value: 'ADMIN', label: 'Administrador' },
    { value: 'USER', label: 'Usuário' }
  ];
 
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sortTable!: MatSort;

  page = 0;
  pageSize = 10;
  sort = 'nome,asc';
  totalElements = 0;

  constructor(
    private userService: UsersService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService
      .listarUsuarios(this.page, this.pageSize, this.sort)
      .subscribe(res => {
        this.dataSource.data = res.content;
        this.totalElements = res.totalElements;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sortTable;
      });
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }

  onSortChange(event: Sort) {
    const direction = event.direction || 'asc';
    this.sort = `${event.active},${direction}`;
    this.loadUsers();
  }

  openCreateUserDialog() {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '500px',
      height: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createUser(result);
      }
    });
  }

  createUser(formData: any) {
    this.userService.cadastrarUsuario(formData)
      .subscribe({
        next: () => {
          this.toastr.success("Usuário criado com sucesso!");
          this.loadUsers();
        },
        error: () => this.toastr.error("Erro ao criar usuário.")
      });
  }

  getRoleLabel(role: string): string {
    return (
      this.roleOptions.find(r => r.value === role)?.label
      ?? role
    );
  }

  excluir(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        titulo: 'Excluir Usuário',
        mensagem: 'Tem certeza que deseja excluir este usuário?'
      }
    });
    dialogRef.afterClosed().subscribe(confirmado => {
      if (!confirmado) return;

      this.userService.excluirUsuario(id).subscribe({
        next: () => {
          this.toastr.success(
            'Usuário excluído com sucesso!',
            'Sucesso'
          );
          this.loadUsers();
        },
        error: () => {
          this.toastr.error(
            'Não foi possível excluir o usuário.',
            'Erro'
          );
        }
      });
    });
  }

  visualizar(id: string): void {
      this.dialog.open(UserWiewDialogComponent, {
        width: '800px',
        maxWidth: '95vw',
        data: { id }
      });
    }

}

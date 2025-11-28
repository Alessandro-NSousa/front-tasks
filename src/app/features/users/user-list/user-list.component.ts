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
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserFormDialogComponent } from '../../../components/user-form-dialog/user-form-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  imports: [MatTableModule, MatPaginatorModule,
    DatePipe, MatCheckboxModule,
    MatIconModule, RouterModule,
    MatButtonModule, MatDialogModule, MatSortModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  displayedColumns: string[] = ['id', 'nome', 'email', 'role', 'ativo'];
 
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

        // importante!
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

}

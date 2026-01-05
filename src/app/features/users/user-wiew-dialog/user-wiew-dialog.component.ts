import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-wiew-dialog',
  imports: [
    MatDialogModule,
    MatIconModule,
    DatePipe,
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './user-wiew-dialog.component.html',
  styleUrl: './user-wiew-dialog.component.scss'
})
export class UserWiewDialogComponent {

  user: any;
  expandido = false;

  roleOptions = [
    { value: 'ADMIN', label: 'Administrador' },
    { value: 'USER', label: 'Usuario' }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private dialogRef: MatDialogRef<UserWiewDialogComponent>,
    private userService: UsersService
  ) {
    this.carregarUsuario();
  }

  carregarUsuario(): void {
    this.userService.buscarUserPorId(this.data.id).subscribe(user => {
      this.user = user;
    });
  }

  

  toggleExpandir(): void {
    this.expandido = !this.expandido;

    this.dialogRef.updateSize(
      this.expandido ? '95vw' : '800px',
      this.expandido ? '95vh' : ''
    );
  }

  fechar(): void {
    this.dialogRef.close();
  }

  getRoleLabel(role: string): string {
    return (
      this.roleOptions.find(r => r.value === role)?.label
      ?? role
    );
  }
  
  getRoleClass(status: string): string {
  switch (status) {
    case 'ADMIN':
      return 'doneIcon';
    case 'USER':
      return 'primaryIcon';
    default:
      return 'secondaryIcon';
  }
}

}

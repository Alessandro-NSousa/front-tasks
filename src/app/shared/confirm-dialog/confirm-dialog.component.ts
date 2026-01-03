import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule, MatButtonModule],
  template: `
  <h2 mat-dialog-title>{{ data.titulo }}</h2>

    <mat-dialog-content>
      {{ data.mensagem }}
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="fechar(false)">
        Cancelar
      </button>

      <button mat-flat-button color="warn" (click)="fechar(true)">
        Confirmar
      </button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { titulo: string; mensagem: string }
  ) {}

  fechar(confirmado: boolean): void {
    this.dialogRef.close(confirmado);
  }

}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaViewDialogComponent } from './tarefa-view-dialog.component';

describe('TarefaViewDialogComponent', () => {
  let component: TarefaViewDialogComponent;
  let fixture: ComponentFixture<TarefaViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarefaViewDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarefaViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

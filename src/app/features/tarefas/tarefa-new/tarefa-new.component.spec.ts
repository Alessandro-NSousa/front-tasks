import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaNewComponent } from './tarefa-new.component';

describe('TarefaNewComponent', () => {
  let component: TarefaNewComponent;
  let fixture: ComponentFixture<TarefaNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarefaNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarefaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

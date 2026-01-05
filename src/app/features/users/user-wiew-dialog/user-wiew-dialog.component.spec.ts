import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWiewDialogComponent } from './user-wiew-dialog.component';

describe('UserWiewDialogComponent', () => {
  let component: UserWiewDialogComponent;
  let fixture: ComponentFixture<UserWiewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWiewDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserWiewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTaskComponent } from './users-task.component';

describe('UsersTaskComponent', () => {
  let component: UsersTaskComponent;
  let fixture: ComponentFixture<UsersTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

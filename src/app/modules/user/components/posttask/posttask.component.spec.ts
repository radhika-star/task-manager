import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosttaskComponent } from './posttask.component';

describe('PosttaskComponent', () => {
  let component: PosttaskComponent;
  let fixture: ComponentFixture<PosttaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosttaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosttaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

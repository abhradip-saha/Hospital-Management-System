import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppointmmentComponent } from './create-appointmment.component';

describe('CreateAppointmmentComponent', () => {
  let component: CreateAppointmmentComponent;
  let fixture: ComponentFixture<CreateAppointmmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAppointmmentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAppointmmentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

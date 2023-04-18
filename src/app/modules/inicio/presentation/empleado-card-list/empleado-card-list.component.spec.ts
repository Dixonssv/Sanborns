import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoCardListComponent } from './empleado-card-list.component';

describe('EmpleadoCardListComponent', () => {
  let component: EmpleadoCardListComponent;
  let fixture: ComponentFixture<EmpleadoCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoCardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

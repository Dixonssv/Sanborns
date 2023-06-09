import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridsterTestComponent } from './gridster-test.component';

describe('GridsterTestComponent', () => {
  let component: GridsterTestComponent;
  let fixture: ComponentFixture<GridsterTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridsterTestComponent]
    });
    fixture = TestBed.createComponent(GridsterTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

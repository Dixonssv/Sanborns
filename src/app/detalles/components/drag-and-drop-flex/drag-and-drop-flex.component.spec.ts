import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropFlexComponent } from './drag-and-drop-flex.component';

describe('DragAndDropFlexComponent', () => {
  let component: DragAndDropFlexComponent;
  let fixture: ComponentFixture<DragAndDropFlexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragAndDropFlexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragAndDropFlexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

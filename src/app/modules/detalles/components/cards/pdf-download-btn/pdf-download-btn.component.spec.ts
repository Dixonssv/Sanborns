import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfDownloadBtnComponent } from './pdf-download-btn.component';

describe('PdfDownloadBtnComponent', () => {
  let component: PdfDownloadBtnComponent;
  let fixture: ComponentFixture<PdfDownloadBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfDownloadBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfDownloadBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

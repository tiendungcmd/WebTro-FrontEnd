import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyTaiKhoanComponent } from './quan-ly-tai-khoan.component';

describe('QuanLyTaiKhoanComponent', () => {
  let component: QuanLyTaiKhoanComponent;
  let fixture: ComponentFixture<QuanLyTaiKhoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuanLyTaiKhoanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuanLyTaiKhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

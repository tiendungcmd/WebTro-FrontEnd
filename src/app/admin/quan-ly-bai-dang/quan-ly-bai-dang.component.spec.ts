import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyBaiDangComponent } from './quan-ly-bai-dang.component';

describe('QuanLyBaiDangComponent', () => {
  let component: QuanLyBaiDangComponent;
  let fixture: ComponentFixture<QuanLyBaiDangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuanLyBaiDangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuanLyBaiDangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

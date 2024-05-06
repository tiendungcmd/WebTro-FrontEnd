import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyBaiDangUserComponent } from './quan-ly-bai-dang-user.component';

describe('QuanLyBaiDangUserComponent', () => {
  let component: QuanLyBaiDangUserComponent;
  let fixture: ComponentFixture<QuanLyBaiDangUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuanLyBaiDangUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuanLyBaiDangUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

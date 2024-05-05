import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangTinComponent } from './dang-tin.component';

describe('DangTinComponent', () => {
  let component: DangTinComponent;
  let fixture: ComponentFixture<DangTinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DangTinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DangTinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstTimeCellComponent } from './est-time-cell.component';

describe('EstTimeCellComponent', () => {
  let component: EstTimeCellComponent;
  let fixture: ComponentFixture<EstTimeCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstTimeCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstTimeCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

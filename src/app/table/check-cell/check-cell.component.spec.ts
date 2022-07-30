import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckCellComponent } from './check-cell.component';

describe('CheckCellComponent', () => {
  let component: CheckCellComponent;
  let fixture: ComponentFixture<CheckCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

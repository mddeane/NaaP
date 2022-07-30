import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentCellComponent } from './segment-cell.component';

describe('SegmentCellComponent', () => {
  let component: SegmentCellComponent;
  let fixture: ComponentFixture<SegmentCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegmentCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

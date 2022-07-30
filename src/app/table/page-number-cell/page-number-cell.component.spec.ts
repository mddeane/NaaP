import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNumberCellComponent } from './page-number-cell.component';

describe('PageNumberCellComponent', () => {
  let component: PageNumberCellComponent;
  let fixture: ComponentFixture<PageNumberCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNumberCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNumberCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

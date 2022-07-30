import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryTitleCellComponent } from './story-title-cell.component';

describe('StoryTitleCellComponent', () => {
  let component: StoryTitleCellComponent;
  let fixture: ComponentFixture<StoryTitleCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryTitleCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryTitleCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RundownRowComponent } from './rundown-row.component';

describe('RundownRowComponent', () => {
  let component: RundownRowComponent;
  let fixture: ComponentFixture<RundownRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RundownRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RundownRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

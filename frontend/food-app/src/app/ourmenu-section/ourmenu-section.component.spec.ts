import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurmenuSectionComponent } from './ourmenu-section.component';

describe('OurmenuSectionComponent', () => {
  let component: OurmenuSectionComponent;
  let fixture: ComponentFixture<OurmenuSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurmenuSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurmenuSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

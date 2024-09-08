import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyUsageTableComponent } from './energy-usage-table.component';

describe('EnergyUsageTableComponent', () => {
  let component: EnergyUsageTableComponent;
  let fixture: ComponentFixture<EnergyUsageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergyUsageTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnergyUsageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

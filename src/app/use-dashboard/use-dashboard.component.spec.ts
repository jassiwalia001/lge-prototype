import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseDashboardComponent } from './use-dashboard.component';

describe('UseDashboardComponent', () => {
  let component: UseDashboardComponent;
  let fixture: ComponentFixture<UseDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UseDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

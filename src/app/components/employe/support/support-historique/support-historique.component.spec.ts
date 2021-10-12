import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportHistoriqueComponent } from './support-historique.component';

describe('SupportHistoriqueComponent', () => {
  let component: SupportHistoriqueComponent;
  let fixture: ComponentFixture<SupportHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportHistoriqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

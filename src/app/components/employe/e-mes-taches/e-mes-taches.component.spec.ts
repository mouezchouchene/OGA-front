import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMesTachesComponent } from './e-mes-taches.component';

describe('EMesTachesComponent', () => {
  let component: EMesTachesComponent;
  let fixture: ComponentFixture<EMesTachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EMesTachesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EMesTachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

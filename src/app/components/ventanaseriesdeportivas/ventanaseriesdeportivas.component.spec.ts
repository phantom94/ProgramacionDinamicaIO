import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaseriesdeportivasComponent } from './ventanaseriesdeportivas.component';

describe('VentanaseriesdeportivasComponent', () => {
  let component: VentanaseriesdeportivasComponent;
  let fixture: ComponentFixture<VentanaseriesdeportivasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaseriesdeportivasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaseriesdeportivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

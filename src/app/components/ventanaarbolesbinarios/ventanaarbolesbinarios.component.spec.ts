import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaarbolesbinariosComponent } from './ventanaarbolesbinarios.component';

describe('VentanaarbolesbinariosComponent', () => {
  let component: VentanaarbolesbinariosComponent;
  let fixture: ComponentFixture<VentanaarbolesbinariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaarbolesbinariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaarbolesbinariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

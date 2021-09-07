import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanarutasmascortasComponent } from './ventanarutasmascortas.component';

describe('VentanarutasmascortasComponent', () => {
  let component: VentanarutasmascortasComponent;
  let fixture: ComponentFixture<VentanarutasmascortasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanarutasmascortasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanarutasmascortasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaproblemamochilaComponent } from './ventanaproblemamochila.component';

describe('VentanaproblemamochilaComponent', () => {
  let component: VentanaproblemamochilaComponent;
  let fixture: ComponentFixture<VentanaproblemamochilaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaproblemamochilaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaproblemamochilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

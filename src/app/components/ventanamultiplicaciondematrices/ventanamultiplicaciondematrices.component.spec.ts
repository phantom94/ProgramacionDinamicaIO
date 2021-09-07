import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanamultiplicaciondematricesComponent } from './ventanamultiplicaciondematrices.component';

describe('VentanamultiplicaciondematricesComponent', () => {
  let component: VentanamultiplicaciondematricesComponent;
  let fixture: ComponentFixture<VentanamultiplicaciondematricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanamultiplicaciondematricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanamultiplicaciondematricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

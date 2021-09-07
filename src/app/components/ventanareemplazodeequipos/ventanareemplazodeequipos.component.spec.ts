import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanareemplazodeequiposComponent } from './ventanareemplazodeequipos.component';

describe('VentanareemplazodeequiposComponent', () => {
  let component: VentanareemplazodeequiposComponent;
  let fixture: ComponentFixture<VentanareemplazodeequiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanareemplazodeequiposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanareemplazodeequiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

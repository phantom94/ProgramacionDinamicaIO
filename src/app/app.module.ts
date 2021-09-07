import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PruebaMaterialComponent } from './prueba-material/prueba-material.component';
import { MatSliderModule } from '@angular/material/slider';
import { VentanaproblemamochilaComponent } from './components/ventanaproblemamochila/ventanaproblemamochila.component';
import { VentanaprincipalComponent } from './components/ventanaprincipal/ventanaprincipal.component';
import { VentanareemplazodeequiposComponent } from './components/ventanareemplazodeequipos/ventanareemplazodeequipos.component';
import { BarramenuComponent } from './components/barramenu/barramenu.component';
import { VentanamultiplicaciondematricesComponent } from './components/ventanamultiplicaciondematrices/ventanamultiplicaciondematrices.component';
import { VentanaseriesdeportivasComponent } from './components/ventanaseriesdeportivas/ventanaseriesdeportivas.component';
import { VentanaarbolesbinariosComponent } from './components/ventanaarbolesbinarios/ventanaarbolesbinarios.component';
import { VentanarutasmascortasComponent } from './components/ventanarutasmascortas/ventanarutasmascortas.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';




@NgModule({
  declarations: [
    AppComponent,
    PruebaMaterialComponent,
    VentanaproblemamochilaComponent,
    VentanaprincipalComponent,
    VentanareemplazodeequiposComponent,
    BarramenuComponent,
    VentanamultiplicaciondematricesComponent,
    VentanaseriesdeportivasComponent,
    VentanaarbolesbinariosComponent,
    VentanarutasmascortasComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

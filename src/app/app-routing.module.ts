import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentanaarbolesbinariosComponent } from './components/ventanaarbolesbinarios/ventanaarbolesbinarios.component';
import { VentanamultiplicaciondematricesComponent } from './components/ventanamultiplicaciondematrices/ventanamultiplicaciondematrices.component';
import { VentanaprincipalComponent } from './components/ventanaprincipal/ventanaprincipal.component';
import { VentanaproblemamochilaComponent } from './components/ventanaproblemamochila/ventanaproblemamochila.component';
import { VentanareemplazodeequiposComponent } from './components/ventanareemplazodeequipos/ventanareemplazodeequipos.component';
import { VentanarutasmascortasComponent } from './components/ventanarutasmascortas/ventanarutasmascortas.component';
import { VentanaseriesdeportivasComponent } from './components/ventanaseriesdeportivas/ventanaseriesdeportivas.component';
import { MochilaComponent } from './components/mochila/mochila.component';


const routes: Routes = [
  {path: '', component: VentanaprincipalComponent},
  // {path: 'problemamochila', component: VentanaproblemamochilaComponent},
  {path: 'problemamochila', component: MochilaComponent},
  {path: 'rutasmascortas', component: VentanarutasmascortasComponent},
  {path: 'reemplazoequipos', component: VentanareemplazodeequiposComponent},
  {path: 'arbolesbinarios', component: VentanaarbolesbinariosComponent},
  {path: 'seriesdeportivas', component: VentanaseriesdeportivasComponent},
  {path: 'multiplicacionmatrices', component: VentanamultiplicaciondematricesComponent},
  {path: 'salir', component: VentanaprincipalComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

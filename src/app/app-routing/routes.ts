import { Routes } from '@angular/router';

import { ListadoClientesComponent } from '../listado-clientes/listado-clientes.component';
import { AgregarClienteComponent } from '../agregar-cliente/agregar-cliente.component';
import { PreciosComponent } from '../precios/precios.component';
import { InscripcionComponent } from '../inscripcion/inscripcion.component';
import { ListadoInscripcionesComponent } from '../listado-inscripciones/listado-inscripciones.component';

export const routes: Routes = [
    { path: 'inscripcion', component: InscripcionComponent },
    { path: 'listado-clientes', component: ListadoClientesComponent },
    { path: 'agregar-cliente', component: AgregarClienteComponent },
    { path: 'agregar-cliente/:clienteID', component: AgregarClienteComponent },
    { path: 'precios', component: PreciosComponent },
    { path: 'listado-inscripciones', component: ListadoInscripcionesComponent },
    { path: '', redirectTo: 'inscripcion', pathMatch: 'full' }
];
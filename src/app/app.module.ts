import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { PreciosComponent } from './precios/precios.component';
import { SeleccionarClienteComponent } from './seleccionar-cliente/seleccionar-cliente.component';
import { ListadoInscripcionesComponent } from './listado-inscripciones/listado-inscripciones.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CheckinComponent } from './checkin/checkin.component';
import { CustomerslistComponent } from './customerslist/customerslist.component';
import { RegistrationlistComponent } from './registrationlist/registrationlist.component';
import { PricesComponent } from './prices/prices.component';
import { AddcustomersComponent } from './addcustomers/addcustomers.component';

import { MsgsService } from './services/msgs.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SeleccionarClienteComponent,
    HeaderComponent,
    FooterComponent,
    CheckinComponent,
    CustomerslistComponent,
    RegistrationlistComponent,
    PricesComponent,
    AddcustomersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule,
    AngularFireStorageModule,
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore,
    MsgsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

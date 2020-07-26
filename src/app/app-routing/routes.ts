import { Routes } from '@angular/router';

import { RegistrationlistComponent } from '../registrationlist/registrationlist.component';
import { CustomerslistComponent } from '../customerslist/customerslist.component';
import { AddcustomersComponent } from '../addcustomers/addcustomers.component';
import { PricesComponent } from '../prices/prices.component';
import { CheckinComponent } from '../checkin/checkin.component';

export const routes: Routes = [
    { path: 'checkin', component: CheckinComponent },
    { path: 'customerlist', component: CustomerslistComponent },
    { path: 'addcutomer', component: AddcustomersComponent },
    { path: 'addcutomer/:customerId', component: AddcustomersComponent },
    { path: 'prices', component: PricesComponent },
    { path: 'registrationlist', component: RegistrationlistComponent },
    { path: '', redirectTo: 'checkin', pathMatch: 'full' }
];
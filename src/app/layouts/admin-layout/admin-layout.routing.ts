import { Routes } from '@angular/router';

import { DashboardComponent } from '../../views/dashboard/dashboard.component';
import { DataSeetComponent } from '../../views/data-seet/data-seet.component';
import { MapsComponent } from '../../views/maps/maps.component';
import { NewFormComponent } from '../../views/new-form/new-form.component';
import { TrakingFormComponent } from '../../views/traking-form/traking-form.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'data-seet',        component: DataSeetComponent },
    { path: 'new-map',        component: MapsComponent },
    { path: 'new-form',        component: NewFormComponent },
    { path: 'traking-form',        component: TrakingFormComponent },
    
];

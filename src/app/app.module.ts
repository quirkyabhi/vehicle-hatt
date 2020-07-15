import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminDashComponent } from './admin-dashboard/admin-dash/admin-dash.component';
import { MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from "@angular/common/http";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatListModule} from '@angular/material/list'
import { MatIconModule } from "@angular/material/icon";
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AddUserComponent } from './admin-dashboard/add-user/add-user.component';
import { AddVehicleComponent } from './admin-dashboard/add-vehicle/add-vehicle.component';
import { AdminHomeComponent } from './admin-dashboard/admin-home/admin-home.component';
import { PaymentDetailsComponent } from './admin-dashboard/payment-details/payment-details.component';
import { RentVehicleComponent } from './admin-dashboard/rent-vehicle/rent-vehicle.component';
import { ReturnVehicleComponent } from './admin-dashboard/return-vehicle/return-vehicle.component';
import { VehicleListComponent } from './admin-dashboard/vehicle-list/vehicle-list.component';
import { VehiclesRentedComponent } from './admin-dashboard/vehicles-rented/vehicles-rented.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { UserListComponent } from './admin-dashboard/user-list/user-list.component';
import { CustomerPaymentHistoryComponent } from './customer-dashboard/customer-payment-history/customer-payment-history.component';
import { CustomerIssuedVehiclesComponent } from './customer-dashboard/customer-issued-vehicles/customer-issued-vehicles.component';
import { CustomerVehiclesAvailableComponent } from './customer-dashboard/customer-vehicles-available/customer-vehicles-available.component';
import { CustomerHomeComponent } from './customer-dashboard/customer-home/customer-home.component';
import { CustomerDashComponent } from './customer-dashboard/customer-dash/customer-dash.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UpdateUserComponent } from './admin-dashboard/update-user/update-user.component';
import { UpdateVehicleComponent } from './admin-dashboard/update-vehicle/update-vehicle.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminDashComponent,
    CustomerDashboardComponent,
    AdminDashboardComponent,
    AddUserComponent,
    AddVehicleComponent,
    AdminHomeComponent,
    PaymentDetailsComponent,
    RentVehicleComponent,
    ReturnVehicleComponent,
    VehicleListComponent,
    VehiclesRentedComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    AdminDashComponent,
    UserListComponent,
    CustomerPaymentHistoryComponent,
    CustomerIssuedVehiclesComponent,
    CustomerVehiclesAvailableComponent,
    CustomerHomeComponent,
    CustomerDashComponent,
    UpdateUserComponent,
    UpdateVehicleComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    MatSnackBarModule,
    
    
    // FormControl,
    // Validators,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

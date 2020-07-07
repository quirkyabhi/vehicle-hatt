import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './admin-dashboard/add-user/add-user.component';
import { PaymentDetailsComponent } from './admin-dashboard/payment-details/payment-details.component';
import { RentVehicleComponent } from './admin-dashboard/rent-vehicle/rent-vehicle.component';
import { ReturnVehicleComponent } from './admin-dashboard/return-vehicle/return-vehicle.component';
import { VehicleListComponent } from './admin-dashboard/vehicle-list/vehicle-list.component';
import { VehiclesRentedComponent } from './admin-dashboard/vehicles-rented/vehicles-rented.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { AdminDashComponent } from './admin-dashboard/admin-dash/admin-dash.component';
import { AdminHomeComponent } from './admin-dashboard/admin-home/admin-home.component';
import { UserListComponent } from './admin-dashboard/user-list/user-list.component';
import { CustomerHomeComponent } from './customer-dashboard/customer-home/customer-home.component';
import { CustomerIssuedVehiclesComponent } from './customer-dashboard/customer-issued-vehicles/customer-issued-vehicles.component';
import { CustomerPaymentHistoryComponent } from './customer-dashboard/customer-payment-history/customer-payment-history.component';
import { CustomerVehiclesAvailableComponent } from './customer-dashboard/customer-vehicles-available/customer-vehicles-available.component';
import { AddVehicleComponent } from './admin-dashboard/add-vehicle/add-vehicle.component';



  // {path:'addUser', component:VehiclesRentedComponent},
  const  routes:  Routes  = [
    {path:'', redirectTo:'/login',pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {path:'admin-dashboard', redirectTo:'admin-dashboard/admin-home'},

    {
      path:  'admin-dashboard',
      component:  AdminDashboardComponent,
      // redirectTo:'admin-dashboard/admin-home',
      children: [
        {
          path:  'admin-home',
          component:  AdminHomeComponent
        },
        {
          path:  'admin-dash',
          component:  AdminDashComponent
        },
        {
          path:  'add-user',
          component:  AddUserComponent
        },
        {
          path:  'add-vehicle',
          component: AddVehicleComponent
        },
        {
          path:  'payment-details',
          component:  PaymentDetailsComponent
        },
        {
          path:  'rent-vehicle',
          component: RentVehicleComponent
        },
        {
          path:  'return-vehicle',
          component: ReturnVehicleComponent
        },
        {
          path:  'vehicle-list',
          component: VehicleListComponent
        },
        {
          path:  'vehicles-rented',
          component: VehiclesRentedComponent
        },
        {
          path:  'user-list',
          component: UserListComponent
        },
    ]
    },

    {path:'customer-dashboard', redirectTo:'customer-dashboard/customer-home'},
    { 
      path:'customer-dashboard',component:CustomerDashboardComponent,
      children:[
        {
          path:  'customer-home',
          component: CustomerHomeComponent
        },
        {
          path:  'issued-vehicles',
          component: CustomerIssuedVehiclesComponent
        },
        {
          path:  'payment-history',
          component: CustomerPaymentHistoryComponent
        },
        {
          path:  'vehicles-available',
          component: CustomerVehiclesAvailableComponent
        },

      ]


    }
    

    ];


  // {path:'adminhome', component:AdminHomeComponent},

  

  

  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

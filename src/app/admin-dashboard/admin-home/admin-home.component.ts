import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/login/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { IssuedVehicleService } from 'src/app/services/issued-vehicle.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { SharedLoggedInUserService } from 'src/app/login/sharedLoggedInUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  customerCount: number
  totalPayment: number
  currentIssuedCount:number
  availableVehicleCount:number
  currentUser: any={}
  constructor(
    private customerService: CustomerService,
    private paymentService: PaymentService,
    private vehicleService: VehicleService,
    private issuedVehicleService: IssuedVehicleService,
    private sharedLoggedInUserService: SharedLoggedInUserService,
    private router: Router) { }
  ngOnInit(): void {
    this.getUserCount()
    this.getPaymentCount()
    this.getIssuedVehicleCount()
    this.getAvailableVehicleCount()
    
  }
  getId(){
    this.sharedLoggedInUserService.currenLoggedUserData.subscribe(data=>{
      this.currentUser=data
      if (data=='') {
        this.router.navigate(['login'])
      }
      // console.log(this.currentUser)
    })
  }
  getUserCount(){
    this.customerService.getUsers().subscribe(data=>{
      this.customerCount=data.length-1
      // console.log(this.customerCount)
    })
  }
  getPaymentCount(){
    this.paymentService.getpayments().subscribe(data=>{
      this.totalPayment=data.reduce( 
        (a: number, b) => a + b.totalRent, 0);
        // console.log(this.totalPayment)
    })
  }
  getIssuedVehicleCount(){
    this.issuedVehicleService.getIssuedVehicles().subscribe(data=>{
      this.currentIssuedCount=data.filter(item=> item.isActive=="true").length
        // console.log(this.totalPayment)
    })
  }
  getAvailableVehicleCount(){
    this.vehicleService.getVehicles().subscribe(data=>{
      let activeVehicle:any={}=data.filter(item=> item.isActive=="true")
      this.availableVehicleCount=activeVehicle.filter(item=> item.isAvailable=="Available").length
        // console.log(this.totalPayment)
    })
  }
}

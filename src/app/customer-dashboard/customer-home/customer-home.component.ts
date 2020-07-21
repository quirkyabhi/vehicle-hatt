import { Component, OnInit } from '@angular/core';
import { SharedLoggedInUserService } from 'src/app/login/sharedLoggedInUser';
import { PaymentService } from 'src/app/services/payment.service';
import { IssuedVehicleService } from 'src/app/services/issued-vehicle.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Router } from '@angular/router';
import $ from 'jquery';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss']
})
export class CustomerHomeComponent implements OnInit {
  
  currentUser:any={}
  totalPaid:number;
  totalIssued:number;
  availableVehicleCount:number;
  constructor(private _snackBar:MatSnackBar,private router:Router,private vehicleService: VehicleService,private issuedVehicleService: IssuedVehicleService,private paymentService:PaymentService,private sharedLoggedInUserService:SharedLoggedInUserService) { 
  
  }

  ngOnInit(): void {
    this.getId()
    this.getPayments()
    this.getIssuedVehicleList()
    this.getAvailableVehicleCount()
    // this.open()
  }
 
  // open(){
   
  // }
   
 
  getId(){
    this.sharedLoggedInUserService.currenLoggedUserData.subscribe(data=>{
      this.currentUser=data
      if (this.currentUser.password=="00000") {
        this._snackBar.open('Change Password', 'You were added by Admin', {
          duration: 4000,
        });
        this.router.navigate(['customer-dashboard/my-profile'])
      } else {
        
      }
      if (data=='') {
        this.router.navigate(['login'])
      }
      // console.log(this.currentUser)
    })
  }
  getPayments(){
    this.paymentService.getMyPaidVehicle(this.currentUser._id).subscribe(data=>{
      this.totalPaid=data.reduce( 
        (a: number, b) => a + b.totalRent, 0);
       
    })
  }
  getIssuedVehicleList(){
    this.issuedVehicleService.getMyIssuedVehicle(this.currentUser._id).subscribe(data=>{
      this.totalIssued=data.filter(item=> item.isActive=="true").length
    
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

import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/login/customer.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { IssuedVehicleService } from 'src/app/services/issued-vehicle.service';
import { PaymentService } from 'src/app/services/payment.service';
import { Vehicle } from 'src/app/services/vehicle';


@Component({
  selector: 'app-return-vehicle',
  templateUrl: './return-vehicle.component.html',
  styleUrls: ['./return-vehicle.component.scss']
})
export class ReturnVehicleComponent implements OnInit {
  customerEmailForm: FormGroup;
  display: boolean=true
  issuedList:any
  vehicleList:any
  returnVehicleForm:FormGroup;
  updatedVehicleObj:Vehicle= new Vehicle()
  securityAmountBind:number
 
  constructor(private paymentService: PaymentService,private issuedVehicleService: IssuedVehicleService, private vehicleService: VehicleService, private customerService:CustomerService, private fb:FormBuilder,private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.createcustomerEmailForm();
    this.getCustomerData();
    this.createReturnVehicleForm();
  }
  
  createcustomerEmailForm() {
    this.customerEmailForm = this.fb.group({
      userEmail:['', Validators.required],
    })
  }
  createReturnVehicleForm(){
    this.returnVehicleForm = this.fb.group({
      fine:['', Validators.required],
      totalRent:['', Validators.required],
      createdDate:[],
      issueId:[],
      userId:[]
    })
  }
 

  getCustomerData(){
    this.issuedVehicleService.getIssuedVehicles().subscribe(data => {
      this.issuedList = data.filter(item => item.isActive !== "false" );
      // console.log(this.issuedList);
      },
      err=> console.log(err))
  }
  // getVehicleData(){
  //   this.vehicleService.getVehicles().subscribe(data => {
  //     this.vehicleList = data.filter(item => item.isActive == "Not Available" );
  //     console.log(this.vehicleList);
  //     },
  //     err=> console.log(err))
  // }
  continue(){
    this.returnVehicleForm.value.createdDate= new Date();
    // console.log( this.returnVehicleForm.value.createdDate.getTime())
    let nowTime=this.returnVehicleForm.value.createdDate.getTime()
    let timeThen=(new Date(this.customerEmailForm.value.userEmail.returnDate).getTime())
    this.returnVehicleForm.value.issueId= this.customerEmailForm.value.userEmail._id
    let diff=Math.floor((nowTime - timeThen)/(1000 * 3600 * 24))
    if (diff>0) {
      this.returnVehicleForm.value.fine= diff*(this.customerEmailForm.value.userEmail.finePerDay + this.customerEmailForm.value.userEmail.rentPerDay) 
    } else {
      this.returnVehicleForm.value.fine= 0
    }
   
    this.returnVehicleForm.value.totalRent=this.returnVehicleForm.value.fine+this.customerEmailForm.value.userEmail.totalRent
    this.returnVehicleForm.patchValue(this.returnVehicleForm.value)
    this.returnVehicleForm.value.userId=this.customerEmailForm.value.userEmail.userId
    this.securityAmountBind= this.customerEmailForm.value.userEmail.securityAmount
  }
  pay(){
    // console.log(this.returnVehicleForm.value)
    this.paymentService.createPayment(this.returnVehicleForm.value).subscribe(data => {
      // this.vehicleList = data.filter(item => item.isAvailable == "Not Available" );
      // console.log(data);
      this.customerEmailForm.value.userEmail.isActive="false"
      this.issuedVehicleService.updateIssuedVehicle(  this.customerEmailForm.value.userEmail._id,this.customerEmailForm.value.userEmail).subscribe(data => {
        // console.log(this.vehicleList);
        this.updatedVehicleObj._id= this.customerEmailForm.value.userEmail.vehicleId
        this.updatedVehicleObj.isAvailable="Available";
        // console.log(this.updatedVehicleObj)
        this.vehicleService.updateVehicle( this.customerEmailForm.value.userEmail.vehicleId,this.updatedVehicleObj).subscribe(data => {
          // console.log(this.vehicleList);
          this._snackBar.open('Payment', 'Success', {
            duration: 4000,
          });
          this.router.navigate(['admin-dashboard/payment-details'])
          },
          err=> this._snackBar.open('Payment', 'Fail', {
            duration: 4000,
          }))
      },
        err=>this._snackBar.open('Payment', 'Fail', {
          duration: 4000,
        }))

      },
      err=> this._snackBar.open('Payment', 'Fail', {
        duration: 4000,
      }))
      
  }
}


  
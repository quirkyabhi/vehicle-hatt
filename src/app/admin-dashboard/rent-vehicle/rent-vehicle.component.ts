import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IssuedVehicleService } from 'src/app/services/issued-vehicle.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { CustomerService } from 'src/app/login/customer.service';
import { Vehicle } from 'src/app/services/vehicle';


@Component({
  selector: 'app-rent-vehicle',
  templateUrl: './rent-vehicle.component.html',
  styleUrls: ['./rent-vehicle.component.scss']
})
export class RentVehicleComponent implements OnInit {
  display: boolean= true
  rentVehicleForm: FormGroup;
  customerList:any
  vehicleList:any
  rentVehicleFormContinued: FormGroup;
  constructor(private customerService: CustomerService,private vehicleService:VehicleService,private issuedVehicleService: IssuedVehicleService, private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) { }
  updateVehicle:Vehicle= new Vehicle()
  ngOnInit(): void {
    this.createRentVehicleForm()
    this.createRentVehicleFormContinued()
    this.getCustomerData()
    this.getVehicleData()
  }

  getCustomerData(){
    this.customerService.getUsers().subscribe(data => {
      this.customerList = data;
      console.log(this.customerList);
      },
      err=> console.log(err))
  }
  getVehicleData(){
    this.vehicleService.getVehicles().subscribe(data => {
      this.vehicleList = data.filter(item => item.isAvailable !== "Not Available" );
      console.log(this.vehicleList);
      },
      err=> console.log(err))
  }
  createRentVehicleForm() {
    this.rentVehicleForm = this.fb.group({
      vehicleName : ['',Validators.required],
      userEmail:['', Validators.required],
      // userId:[],
      // userName: [],
      // userPhone:[],
      issueDate:['', Validators.required],
      returnDate:['', Validators.required],
      // totalRent:[]
    })
  }
  createRentVehicleFormContinued() {
    this.rentVehicleFormContinued = this.fb.group({
      vehicleNo:[],
      vehicleName : ['',Validators.required],
      userEmail:['', Validators.required],
      userName: [],
      userPhone:[],
      issueDate:['', Validators.required],
      returnDate:['', Validators.required],
      vehicleType:[],
      rentPerDay:[],
      totalRent:[],
      finePerDay:[],
      totalFine:[],
      securityAmount:[],
      vehicleId:[],
      userId:[]
    })
  }
  continue(){
    
   
    // console.log(this.rentVehicleFormContinued.value.vehicleNo)
    // this.rentVehicleFormContinued.patchValue(this.rentVehicleForm.value);
    this.rentVehicleFormContinued.patchValue(this.rentVehicleForm.value.vehicleName);
    this.rentVehicleFormContinued.value.userEmail=this.rentVehicleForm.value.userEmail.email;
    this.rentVehicleFormContinued.value.userName=this.rentVehicleForm.value.userEmail.fname + ' '+this.rentVehicleForm.value.userEmail.lname;
    this.rentVehicleFormContinued.value.userPhone=this.rentVehicleForm.value.userEmail.phone;
    this.rentVehicleFormContinued.value.issueDate=this.rentVehicleForm.value.issueDate;
    this.rentVehicleFormContinued.value.returnDate=this.rentVehicleForm.value.returnDate;
      
    this.rentVehicleFormContinued.value.finePerDay=this.rentVehicleForm.value.vehicleName.fine;
    this.rentVehicleFormContinued.value.totalFine=0;
    this.rentVehicleFormContinued.value.userId=this.rentVehicleForm.value.userEmail._id;
    this.rentVehicleFormContinued.value.vehicleId=this.rentVehicleForm.value.vehicleName._id;

    // this.rentVehicleFormContinued.value.securityAmount=this.rentVehicleForm.value.vehicleName.securityAmount;
    this.rentVehicleFormContinued.value.totalRent= (this.rentVehicleFormContinued.value.rentPerDay)*(((this.rentVehicleFormContinued.value.returnDate).getTime()-( this.rentVehicleFormContinued.value.issueDate).getTime())/(1000 * 3600 * 24))
    this.rentVehicleFormContinued.patchValue(this.rentVehicleFormContinued.value);
    this.display=false
    console.log(this.rentVehicleFormContinued.value)


  }
 

  rentVehicle() {
    this.issuedVehicleService.createIssuedVehicle(this.rentVehicleFormContinued.value).subscribe(data => {
      // console.log("success")
      console.log(data)
      this._snackBar.open('Rent Vehicle', 'Success', {
        duration: 4000,
      })
      this.updateVehicle.isAvailable="Not Available";
      this.vehicleService.updateVehicle(this.rentVehicleFormContinued.value.vehicleId,this.updateVehicle).subscribe(data=>{
        console.log("updated")
      })
    }, err => this._snackBar.open('Rent Vehicle', 'Failed', {
      duration: 4000,
    }
    ))
  }

}

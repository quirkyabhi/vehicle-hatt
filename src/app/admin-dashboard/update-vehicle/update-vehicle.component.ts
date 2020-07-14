import { Component, OnInit } from '@angular/core';
import { SharedVehicleService } from '../vehicle-list/sharedVehicleData.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from 'src/app/services/vehicle.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.scss']
})
export class UpdateVehicleComponent implements OnInit {
  updateVehicleForm: FormGroup;
  vehicleId: string;
  vehicleDetails: any={};
  constructor( private sharedVehicleService: SharedVehicleService, private vehicleService: VehicleService ,private fb:FormBuilder,private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.createUpdateForm()
    this.getCurrentVehicleData()
  }
  createUpdateForm(){
    this.updateVehicleForm= this.fb.group({
      vehicleName : ['',Validators.required],
      vehicleNo : ['',Validators.required],
      vehicleType : ['',Validators.required],
      registrationNo : ['',Validators.required],
      insuranceNo : ['',Validators.required],
      rentPerDay : ['',Validators.required],
      securityAmount : ['',Validators.required],
      fine : ['',Validators.required],
      description:[],
      year: [],
      kmRan:[],
      model:[],
      color:[],
      isAvailable:[],
      isActive:[]
    })
    
  }

  getCurrentVehicleData(){
    this.sharedVehicleService.currentVehicleData.subscribe(data=>{
      this.vehicleDetails=data;
      console.log(data)
      this.vehicleId= this.vehicleDetails._id
      this.updateVehicleForm.patchValue(this.vehicleDetails);
    });
  }
  
  updateVehicle(){
    // this.updateUserForm.value.age=Math.floor((( Date.now()-(this.updateUserForm.value.dob) ) / (1000 * 3600 * 24)) / 365);
    // console.log(this.updateUserForm.value.age)
    console.log("lol")
    this.vehicleService.updateVehicle(this.vehicleId,this.updateVehicleForm.value).subscribe(data=>{
      console.log("success")
      console.log(data)
      this._snackBar.open('Update Vehicle', 'Success', {
        duration: 4000,
      })
    }, err=> this._snackBar.open('Update Vehicle', 'Failed', {
      duration: 4000,
    }
      ))
  
  }


  }

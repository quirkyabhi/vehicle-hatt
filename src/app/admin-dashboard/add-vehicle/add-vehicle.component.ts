import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {
  addVehicleForm: FormGroup;
  constructor(private vehicleService: VehicleService, private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.createAddVehicleForm()
  }

  createAddVehicleForm() {
    this.addVehicleForm = this.fb.group({
      vehicleName : ['',Validators.required],
      vehicleNo : ['',Validators.required],
      vehicleType : ['',Validators.required],
      registrationNo : ['',Validators.required],
      insuranceNo : ['',Validators.required],
      rentPerDay : ['',Validators.required],
      securityAmount : ['',Validators.required],
      fine : ['',Validators.required],


      
    })
  }

  addVehicle() {
    this.vehicleService.createVehicle(this.addVehicleForm.value).subscribe(data => {
      console.log("success")
      console.log(data)
      this._snackBar.open('Add Vehicle', 'Success', {
        duration: 4000,
      })
    }, err => this._snackBar.open('Add Vehicle', 'Failed', {
      duration: 4000,
    }
    ))
  }

}

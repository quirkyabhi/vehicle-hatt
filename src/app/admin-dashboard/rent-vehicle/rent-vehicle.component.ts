import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IssuedVehicleService } from 'src/app/services/issued-vehicle.service';

@Component({
  selector: 'app-rent-vehicle',
  templateUrl: './rent-vehicle.component.html',
  styleUrls: ['./rent-vehicle.component.scss']
})
export class RentVehicleComponent implements OnInit {

  rentVehicleForm: FormGroup;
  constructor(private issuedVehicleService: IssuedVehicleService, private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.createRentVehicleForm()
  }

  createRentVehicleForm() {
    this.rentVehicleForm = this.fb.group({
      vehicleName : ['',Validators.required],
      userEmail:['', Validators.required],
      userId:[],
      userName: [],
      userPhone:[],
      issueDate:[],
      returnDate:[],
      totalRent:[]



      
    })
  }

  rentVehicle() {
    this.issuedVehicleService.createIssuedVehicle(this.rentVehicleForm.value).subscribe(data => {
      console.log("success")
      console.log(data)
      this._snackBar.open('Rent Vehicle', 'Success', {
        duration: 4000,
      })
    }, err => this._snackBar.open('Rent Vehicle', 'Failed', {
      duration: 4000,
    }
    ))
  }

}

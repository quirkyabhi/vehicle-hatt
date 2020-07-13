import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/login/customer.service';
import { SharedUserService } from '../user-list/sharedUserData.service';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  updateUserForm: FormGroup;
  userId: string;
  customerDetails:any={};

  constructor( private sharedUserService: SharedUserService, private customerService: CustomerService ,private fb:FormBuilder,private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.createUpdateForm()
    this.getCurrentUserData()
  }
  createUpdateForm(){
    // this.updateUserForm= this.fb.group({
    //   fname : ['',Validators.required],
    //   lname : ['',Validators.required],
    //   email : ['',Validators.required],
    //   phone : ['',Validators.required],
    //   gender : ['',Validators.required],
    //   dlNo : ['',Validators.required],
    //   isActive : ['',Validators.required],
    //   dob : ['',Validators.required],
    //   age : ['',Validators.required],
    //   address : ['',Validators.required],
    //   state : ['',Validators.required],
    //   city : ['',Validators.required],
    //   pin : ['',Validators.required],
    //   altPhone : ['',Validators.required],
    this.updateUserForm= this.fb.group({
      fname : ['',Validators.required],
      lname : ['',Validators.required],
      email : ['',Validators.required],
      phone : ['',Validators.required],
      gender : ['',Validators.required],
      dlNo : ['',Validators.required],
      isActive : [],
      dob : [],
      age : [],
      address : [],
      state : [],
      city : [],
      pin : [],
      altPhone : [],
    })
    
  }

  getCurrentUserData(){
    this.sharedUserService.currenUsertData.subscribe(data=>{
      this.customerDetails=data;
      console.log(data)
      this.userId= this.customerDetails._id
      this.updateUserForm.patchValue(this.customerDetails);
    });
  }
  
  updateUser(){
    // this.customerDetails= this.updateUserForm.value
    // this.updateUserForm.value.age= ( Date.now()-(this.updateUserForm.value.dob) )
    this.updateUserForm.value.age=Math.floor((( Date.now()-(this.updateUserForm.value.dob) ) / (1000 * 3600 * 24)) / 365);
    console.log(this.updateUserForm.value.age)
    console.log("lol")
    this.customerService.updateUser(this.userId,this.updateUserForm.value).subscribe(data=>{
      console.log("success")
      console.log(data)
      // this.sharedService.updateMessage(data)
      this._snackBar.open('Update Details', 'Success', {
        duration: 4000,
      })
    }, err=> this._snackBar.open('Update Details', 'Failed', {
      duration: 4000,
    }
      ))
    
    // alert("hi")
  }


  }

  


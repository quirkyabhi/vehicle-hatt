import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/login/customer.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  constructor(private customerService: CustomerService ,private fb:FormBuilder,private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.createAddUserForm()
  }
  createAddUserForm(){
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
    this.addUserForm= this.fb.group({
      fname : ['',Validators.required],
      lname : ['',Validators.required],
      email : ['',Validators.required],
      phone : ['',Validators.required],
      gender : ['',Validators.required],
      dlNo : ['',Validators.required],
      password:[],
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
  addUser(){
    
  }

}

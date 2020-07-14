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
    this.createAddUserForm();
  }
  createAddUserForm(){
    this.addUserForm= this.fb.group({
      fname : ['',Validators.required],
      lname : ['',Validators.required],
      email : ['',Validators.required],
      phone : ['',Validators.required],
      gender : ['',Validators.required],
      dlNo : ['',Validators.required],
      // password:['',Validators.required]
    
    })
    
  }
  addUser(){
    this.addUserForm.value.password="00000"
    this.customerService.createUser(this.addUserForm.value).subscribe(data=>{
      // alert("Add successful")
      this._snackBar.open('Add User', 'Success', {
        duration: 4000,
      }
        )
      console.log(data)
    },  err=> this._snackBar.open('Add User', 'Failed', {
      duration: 4000,
    }
      ))
  }

}

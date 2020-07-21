import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/login/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedLoggedInUserService } from 'src/app/login/sharedLoggedInUser';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  updateUserForm: FormGroup;
  currentUser: any={}
  selectedFile: File=null
  constructor(private sharedLoggedInUserService:SharedLoggedInUserService, private customerService: CustomerService ,private fb:FormBuilder,private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.createUpdateForm()
    this.getId()
  }
  onFileSelected(event){
    this.selectedFile=<File>event.target.files[0]
  }
  onUpload(){
    const fd= new FormData();
    fd.append('url',this.selectedFile,this.selectedFile.name)
    this.customerService.updateUser(this.currentUser._id,fd).subscribe(data=>{
      this._snackBar.open('Upload Image ', 'Success', {
        duration: 4000,
      }) 
    }, err=> this._snackBar.open('Update Details', 'Failed', {
      duration: 4000,
    }
      ))
  }
  createUpdateForm(){
    this.updateUserForm= this.fb.group({
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
  getId(){
    this.sharedLoggedInUserService.currenLoggedUserData.subscribe(data=>{
      this.currentUser=data
      if (data=='') {
        this.router.navigate(['login'])
      }
      // console.log(this.currentUser)
      this.updateUserForm.patchValue(this.currentUser)
    })
  }
  
  updateUser(){
    this.updateUserForm.value.age=Math.floor((( Date.now()-(this.updateUserForm.value.dob) ) / (1000 * 3600 * 24)) / 365);
    console.log(this.updateUserForm.value.age)
    console.log("lol")
    this.customerService.updateUser(this.currentUser._id,this.updateUserForm.value).subscribe(data=>{
      console.log("success")
      // console.log(data)
      this.sharedLoggedInUserService.updateMessage(data)
      this._snackBar.open('Update Details', 'Success', {
        duration: 4000,
      })
      this.router.navigate(['customer-dashboard'])
    }, err=> this._snackBar.open('Update Details', 'Failed', {
      duration: 4000,
    }
      ))
  
  }

}

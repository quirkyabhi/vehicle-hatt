import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from './customer.service';
// import { MustMatch } from "./_helpers/must-match.validator";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedLoggedInUserService } from './sharedLoggedInUser';
// import { Customer } from './customer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  pass:string;
  confirmPass:string
  hide=true
  signupForm: FormGroup;
  loginForm: FormGroup;
  disable=true

  constructor(private sharedLoggedInUserService:  SharedLoggedInUserService,private fb:FormBuilder, private customerService:CustomerService,private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm()
    this.createSignupForm()
    this.confirm()
  }
  confirm(){
    this.signupForm.get('password').valueChanges.subscribe(password=> {

      this.pass=password
      if(this.confirmPass==this.pass){
        this.disable=false;
        this._snackBar.open('Passwords', 'Match', {
          duration: 4000,
        }
          )
      }else{
        this.disable=true
      }
     })
    if(this.confirmPass==this.pass){
      this.disable=false;
      
    }
    else{
      this.disable=true
      this._snackBar.open('Passwords', "Don't match", {
        duration: 4000,
      }
        )
    }
  }
  

  createSignupForm(){
    this.signupForm= this.fb.group({
      fname : ['',Validators.required],
      lname : ['',Validators.required],
      email : ['',Validators.required, Validators.email],
      password : ['',Validators.required, Validators.minLength(6)],
      gender : ['',Validators.required],
      phone : ['',Validators.required],
      dlNo : ['',Validators.required],
      

    })
  }
  createLoginForm(){
    this.loginForm= this.fb.group({
      
      email : ['',Validators.required, Validators.email],
      password : ['',Validators.required, Validators.minLength(6)],
      

    })
    
  }
  signup(){
    // alert("sigup called")
    // this.signupForm.value.role="user"
    // this.signupForm.value.createdAt = new Date();
    // this.signupForm.value.isActive = true;
    this.customerService.createUser(this.signupForm.value).subscribe(data=>{
      // alert("signup successful")
      this._snackBar.open('Signup', 'Success', {
        duration: 4000,
      }
        )
      // console.log(data)
    },  err=> this._snackBar.open('Signup', 'Failed', {
      duration: 4000,
    }
      ))
  }
  login(){
    this.customerService.loginUser(this.loginForm.value).subscribe(data=>{
      // console.log(data)
      this._snackBar.open('Login Successful', 'Success', {
        duration: 4000,
      });
      this.sharedLoggedInUserService.updateMessage(data);
      if (data.role=='admin') {
        this.router.navigate(['admin-dashboard'])
      } else {
        this.router.navigate(['customer-dashboard'])
      }
      
      // console.log(data)
      // alert("login successful")
      
    }, err=> this._snackBar.open('Login', 'Failed', {
      duration: 4000,
    }
      )
    )
  }
}


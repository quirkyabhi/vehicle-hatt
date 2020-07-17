import { Component, OnInit } from '@angular/core';
import { SharedLoggedInUserService } from '../login/sharedLoggedInUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn:boolean
  userName:any
  constructor(private router: Router,private sharedLoggedInUserService: SharedLoggedInUserService) { }

  ngOnInit(): void {
    this.getId();
  }
  getId(){
    this.sharedLoggedInUserService.currenLoggedUserData.subscribe(data=>{

      if (data=='') {
        this.loggedIn=false
        this.userName=data
        this.userName= this.userName.name
      } else {
        this.loggedIn=true
        
      }
      // console.log(this.currentUser)
    })
  }
  logout(){
    this.router.navigate(['login'])
  }
  login(){
    this.router.navigate(['login'])
  }

}

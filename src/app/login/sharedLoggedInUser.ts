import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SharedLoggedInUserService {
  private loggedUserData = new BehaviorSubject('');
  currenLoggedUserData = this.loggedUserData.asObservable();
  constructor() { }
  updateMessage(data){
    this.loggedUserData.next(data)
    
  
  }
}

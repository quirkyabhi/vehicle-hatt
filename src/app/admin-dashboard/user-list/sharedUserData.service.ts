import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SharedUserService {
  private userData = new BehaviorSubject('');
  currenUsertData = this.userData.asObservable();
  constructor() { }
  updateMessage(data){
    this.userData.next(data)
    
  
  }
}

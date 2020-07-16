import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SharedRentedVehicleService {
  private rentedVehicle = new BehaviorSubject('');
  currentRentedVehicle = this.rentedVehicle.asObservable();
  constructor() { }
  updateMessage(data){
    this.rentedVehicle.next(data)
    
  
  }
}

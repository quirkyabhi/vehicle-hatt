import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SharedVehicleService {
  private vehicleData = new BehaviorSubject('');
  currentVehicleData = this.vehicleData.asObservable();
  constructor() { }
  updateMessage(data){
    this.vehicleData.next(data)
    
  
  }
}

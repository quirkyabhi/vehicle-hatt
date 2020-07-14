import { Injectable } from '@angular/core';
import { Vehicle } from "./vehicle";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getVehicles():Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>('http://localhost:3000/api/vehicles')
  }
  createVehicle(model):Observable<Vehicle>{
    return this.http.post<Vehicle>('http://localhost:3000/api/vehicles',model)
  }
  // loginUser(model):Observable<Vehicle>{
  //   return this.http.post<Vehicle>('http://localhost:3000/api/users/login',model)
  // }
  getVehicle(id):Observable<Vehicle>{
    return this.http.get<Vehicle>('http://localhost:3000/api/vehicles/'+id)
  }
  updateVehicle(id,model):Observable<Vehicle>{
    return this.http.put<Vehicle>('http://localhost:3000/api/vehicles/'+id,model)
  }
}

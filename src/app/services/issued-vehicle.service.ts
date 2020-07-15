import { Injectable } from '@angular/core';
import { IssuedVehicle } from "./issuedVehicle";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class IssuedVehicleService {

  constructor(private http: HttpClient) { }

  getIssuedVehicles():Observable<IssuedVehicle[]>{
    return this.http.get<IssuedVehicle[]>('http://localhost:3000/api/issuedVehicles')
  }
  createIssuedVehicle(model):Observable<IssuedVehicle>{
    return this.http.post<IssuedVehicle>('http://localhost:3000/api/issuedVehicles',model)
  }
  // loginUser(model):Observable<IssuedVehicle>{
  //   return this.http.post<IssuedVehicle>('http://localhost:3000/api/issuedVehicle',model)
  // }
  getIssuedVehicle(id):Observable<IssuedVehicle>{
    return this.http.get<IssuedVehicle>('http://localhost:3000/api/issuedVehicles/'+id)
  }
  updateIssuedVehicle(id,model):Observable<IssuedVehicle>{
    return this.http.put<IssuedVehicle>('http://localhost:3000/api/issuedVehicles/'+id,model)
  }
}

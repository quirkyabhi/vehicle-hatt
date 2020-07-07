import { Injectable } from '@angular/core';
import { Customer } from "./customer";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getUsers():Observable<Customer[]>{
    return this.http.get<Customer[]>('http://localhost:3000/api/users')
  }
  createUser(model):Observable<Customer>{
    return this.http.post<Customer>('http://localhost:3000/api/users/signup',model)
  }
  loginUser(model):Observable<Customer>{
    return this.http.post<Customer>('http://localhost:3000/api/users/login',model)
  }
}

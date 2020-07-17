import { Injectable } from '@angular/core';
import { Payment } from "./payment";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  getpayments():Observable<Payment[]>{
    return this.http.get<Payment[]>('http://localhost:3000/api/payments')
  }
  createPayment(model):Observable<Payment>{
    return this.http.post<Payment>('http://localhost:3000/api/payments',model)
  }
  // loginUser(model):Observable<Payment>{
  //   return this.http.post<Payment>('http://localhost:3000/api/payments',model)
  // }
  getPayment(id):Observable<Payment>{
    return this.http.get<Payment>('http://localhost:3000/api/payments/'+id)
  }
  updatePayment(id,model):Observable<Payment>{
    return this.http.put<Payment>('http://localhost:3000/api/payments/'+id,model)
  }

  getMyPaidVehicle(id):Observable<Payment[]>{
    return this.http.get<Payment[]>('http://localhost:3000/api/payments/myPaidVehicles/'+id);
}
}


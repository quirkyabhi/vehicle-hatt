import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Payment } from 'src/app/services/payment';
import { SharedLoggedInUserService } from 'src/app/login/sharedLoggedInUser';
import { PaymentService } from 'src/app/services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-payment-history',
  templateUrl: './customer-payment-history.component.html',
  styleUrls: ['./customer-payment-history.component.scss']
})
export class CustomerPaymentHistoryComponent implements OnInit {
  currentUser:any={};
  paidList:Payment[];
  dataSource: MatTableDataSource<Payment>;
  
  displayedColumns: string[] = [ '_id','issueId', 'fine', 'totalRent','issueDate','returnDate','createdDate'];
  

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
 
  constructor(private router: Router,private paymentService:PaymentService,private sharedLoggedInUserService:SharedLoggedInUserService) { 
    
  }
  
  ngOnInit(): void {
   this.getId()
   this.getPayments()
  }
  getId(){
    this.sharedLoggedInUserService.currenLoggedUserData.subscribe(data=>{
      this.currentUser=data
      // console.log(this.currentUser)
      if (data=='') {
        this.router.navigate(['login'])
      }
    })
  }
  getPayments(){
    this.paymentService.getMyPaidVehicle(this.currentUser._id).subscribe(data=>{
      this.paidList=data
       // this.dataSource= this.customerList;
       this.dataSource = new MatTableDataSource<Payment>(this.paidList)
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
      // console.log(this.paidList)
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Payment } from 'src/app/services/payment';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {
  paymentList:Payment[];
  dataSource: MatTableDataSource<Payment>;
  getPaymentList(){
    this.paymentService.getpayments().subscribe(res=>{
      this.paymentList=res;
      // this.customerList=res.filter(item => item.role !== "admin" );
      // this.customerList=this.customerList.filter(item => item.isActive !=="false");
      
    
      console.log(this.paymentList)
      // this.dataSource= this.customerList;
      this.dataSource = new MatTableDataSource<Payment>(this.paymentList)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  displayedColumns: string[] = [ '_id','issueId','fine','totalRent', 'status', 'createdDate'];
  

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private router: Router,private paymentService: PaymentService) { 
   
  }

  ngOnInit(): void {
    this.getPaymentList();
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

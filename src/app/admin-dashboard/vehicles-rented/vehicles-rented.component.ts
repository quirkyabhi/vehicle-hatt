import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { IssuedVehicleService } from 'src/app/services/issued-vehicle.service';
import { IssuedVehicle } from 'src/app/services/issuedVehicle';
import { SharedRentedVehicleService } from './sharedRentedVehicle.service';


@Component({
  selector: 'app-vehicles-rented',
  templateUrl: './vehicles-rented.component.html',
  styleUrls: ['./vehicles-rented.component.scss']
})
export class VehiclesRentedComponent implements OnInit {
  issuedVehicleList:IssuedVehicle[];
  dataSource: MatTableDataSource<IssuedVehicle>;
  getPaymentList(){
    this.issuedVehicleService.getIssuedVehicles().subscribe(res=>{
      this.issuedVehicleList=res;
      // this.customerList=res.filter(item => item.role !== "admin" );
      // this.customerList=this.customerList.filter(item => item.isActive !=="false");
      
    
      console.log(this.issuedVehicleList)
      // this.dataSource= this.customerList;
      this.dataSource = new MatTableDataSource<IssuedVehicle>(this.issuedVehicleList)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  displayedColumns: string[] = [ '_id','vehicleName','userName','issueDate', 'returnDate', 'totalRent','isActive','createdAt'];
  

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private sharedRentedVehicleService:SharedRentedVehicleService, private router: Router,private issuedVehicleService: IssuedVehicleService) { 
   
  }

  ngOnInit(): void {
    this.getPaymentList();
  }

  return(data){
    this.sharedRentedVehicleService.updateMessage(data);
    console.log(data)
    this.router.navigate(['admin-dashboard/return-vehicle'])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

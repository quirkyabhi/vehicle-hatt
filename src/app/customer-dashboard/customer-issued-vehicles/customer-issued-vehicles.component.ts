import { Component, OnInit, ViewChild } from '@angular/core';
import { IssuedVehicle } from 'src/app/services/issuedVehicle';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { SharedLoggedInUserService } from 'src/app/login/sharedLoggedInUser';
import { IssuedVehicleService } from 'src/app/services/issued-vehicle.service';

@Component({
  selector: 'app-customer-issued-vehicles',
  templateUrl: './customer-issued-vehicles.component.html',
  styleUrls: ['./customer-issued-vehicles.component.scss']
})
export class CustomerIssuedVehiclesComponent implements OnInit {
  currentUser:any={};
  issuedList:IssuedVehicle[];
  dataSource: MatTableDataSource<IssuedVehicle>;


  displayedColumns: string[] = [ '_id','vehicleNo','vehicleName','issueDate', 'returnDate','securityAmount','rentPerDay','finePerDay','totalRent'];
  

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private issuedVehicleService:IssuedVehicleService,private sharedLoggedInUserService: SharedLoggedInUserService, private router: Router) { 
  
  }

  ngOnInit(): void {
    this.getId()
    this.getIssuedVehicleList();
  }

  getId(){
    this.sharedLoggedInUserService.currenLoggedUserData.subscribe(data=>{
      this.currentUser=data
      console.log(this.currentUser)
    })
  }
  getIssuedVehicleList(){
    this.issuedVehicleService.getMyIssuedVehicle(this.currentUser._id).subscribe(data=>{
      this.issuedList=data
      console.log(this.issuedList)
      this.dataSource = new MatTableDataSource<IssuedVehicle>(this.issuedList)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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

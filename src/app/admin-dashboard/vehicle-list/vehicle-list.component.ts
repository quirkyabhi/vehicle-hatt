import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/services/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';
import { SharedVehicleService } from './sharedVehicleData.service';



@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  VehicleList:Vehicle[];
  // dataSource=[];
  dataSource: MatTableDataSource<Vehicle>;
  getVehicleList(){
    this.vehicleService.getVehicles().subscribe(res=>{
      this.VehicleList=res;
      // this.VehicleList=res.filter(item => item.role !== "admin" );
      // this.customerList=this.customerList.filter(item => item.isActive !=="false");
      
    
      console.log(this.VehicleList)
      // this.dataSource= this.customerList;
      this.dataSource = new MatTableDataSource<Vehicle>(this.VehicleList)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  displayedColumns: string[] = [ '_id','url','isAvailable','vehicleName','vehicleType','rentPerDay','fine','securityAmount','vehicleNo','registrationNo', 'insuranceNo', 'year','kmRan','model','color','description','isActive','createdAt'];
  

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private sharedVehicleService: SharedVehicleService, private router: Router,private vehicleService: VehicleService) { 
   
  }

  ngOnInit(): void {
    this.getVehicleList();

    

  }
  editVehicle(data){
    // alert(data);
    this.sharedVehicleService.updateMessage(data);
    // console.log(data)
    this.router.navigate(['admin-dashboard/update-vehicle'])

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

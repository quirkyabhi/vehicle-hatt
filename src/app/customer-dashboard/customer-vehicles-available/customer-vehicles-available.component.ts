import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Vehicle } from 'src/app/services/vehicle';

@Component({
  selector: 'app-customer-vehicles-available',
  templateUrl: './customer-vehicles-available.component.html',
  styleUrls: ['./customer-vehicles-available.component.scss']
})
export class CustomerVehiclesAvailableComponent implements OnInit {

  constructor(private vehicleService: VehicleService) { }
  vehicleList: Vehicle[]
  vehicleMoto:any
  vehicleSedan:any
  vehicleHatchback:any
  vehicleSUV:any
  vehicleMinibus:any
  ngOnInit(): void {
    this.getVehicleList()
  }
  getVehicleList(){
    this.vehicleService.getVehicles().subscribe(res=>{
      this.vehicleList=res;
      this.vehicleList=res.filter(item => item.isActive== "true" );
      this.vehicleList= this.vehicleList.filter(item => item.isAvailable== "Available" );

      // this.vehicleMoto=this.vehicleList.filter(item => item.vehicleType== "Moto")
      // this.vehicleSedan=this.vehicleList.filter(item => item.vehicleType== "Sedan")
      // this.vehicleHatchback=this.vehicleList.filter(item => item.vehicleType== "Hatchback")
      // this.vehicleSUV=this.vehicleList.filter(item => item.vehicleType== "SUV")
      // this.vehicleMinibus=this.vehicleList.filter(item => item.vehicleType== "Minibus")
      console.log(this.vehicleList)

    })
    
      // this.customerList=this.customerList.filter(item => item.isActive !=="false");
      
    
      // console.log(this.VehicleList)
      // this.dataSource= this.customerList;
     
  }

}

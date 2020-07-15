import {Component, OnInit, ViewChild} from '@angular/core';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}


@Component({
  selector: 'app-return-vehicle',
  templateUrl: './return-vehicle.component.html',
  styleUrls: ['./return-vehicle.component.scss']
})
export class ReturnVehicleComponent implements OnInit {
 
 

  ngOnInit(): void {
    
  }
 
}


  
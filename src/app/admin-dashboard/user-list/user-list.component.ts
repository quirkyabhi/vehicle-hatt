import {Component, OnInit, ViewChild, Injectable} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CustomerService } from 'src/app/login/customer.service';
import { Customer } from 'src/app/login/customer';
import { SharedUserService } from './sharedUserData.service';
import { Router } from '@angular/router';






// const COLORS: string[] = [
//   'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
//   'aqua', 'blue', 'navy', 'black', 'gray'
// ];
// const NAMES: string[] = [
//   'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
//   'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
// ];


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  customerList:Customer[];
  // dataSource=[];
  dataSource: MatTableDataSource<Customer>;
  getCustomerList(){
    this.customerService.getUsers().subscribe(res=>{
      // this.customerList=res;
      this.customerList=res.filter(item => item.role !== "admin");

    
      console.log(this.customerList)
      // this.dataSource= this.customerList;
      this.dataSource = new MatTableDataSource<Customer>(this.customerList)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  displayedColumns: string[] = [ '_id','fname','lname','email', 'gender', 'phone','dlNo','dob','age','address','state','city','pin','isActive','createdAt'];
  

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private router: Router,private customerService: CustomerService, private sharedUserService :SharedUserService) { 
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
    this.getCustomerList();

    

  }
  editUser(data){
    // alert(data);
    this.sharedUserService.updateMessage(data);
    console.log(data)
    this.router.navigate(['admin-dashboard/update-user'])

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
// function createNewUser(id: number): UserData {
//   const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//       NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//   };
// }

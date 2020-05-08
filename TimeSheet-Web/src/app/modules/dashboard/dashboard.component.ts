import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  back(){
    this.router.navigate(['/login']);
    sessionStorage.clear();
  }

  goAttendance(){
    this.router.navigate(['/attendance']);
  }

  goSupervisor(){
    this.router.navigate(['/supervisor']);
  }


}

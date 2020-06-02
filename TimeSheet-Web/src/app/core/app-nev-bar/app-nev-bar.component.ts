import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-nev-bar',
  templateUrl: './app-nev-bar.component.html',
  styleUrls: ['./app-nev-bar.component.scss']
})
export class AppNevBarComponent implements OnInit {

  dataProfile: any;
  userCode = '';
  isSup: boolean = true;
  listMenu = [];
  isHandset: any;
  selectMenu: any;

  constructor(
    private router: Router,    
  ) {}

  ngOnInit() {    
    this.dataProfile = JSON.parse(sessionStorage.getItem('userProfileIam'));
    this.userCode = this.dataProfile != null ? this.dataProfile.userCode : '';
    if (this.dataProfile.userRoleObjects[0].roleCode && 'SUPERVISOR' == this.dataProfile.userRoleObjects[0].roleCode) {
      this.isSup = true;
      this.listMenu = [
        { id: 0, code: "Dash Board", name: "Dash Board", link: "/dashboard", isShow: true },
        { id: 1, code: "Attendance List", name: "Attendance List", link: "/attendance", isShow: false },
        { id: 2, code: "User Profile", name: "User Profile", link: "/user-profile", isShow: true },
        { id: 3, code: "Report", name: "Report", link: "/report", isShow: true },
      ];
    } else {
      this.isSup = false;
      this.listMenu = [
        { id: 0, code: "Dash Board", name: "Dash Board", link: "/dashboard", isShow: true },
        { id: 1, code: "Attendance List", name: "Attendance List", link: "/attendance", isShow: true },
        { id: 2, code: "User Profile", name: "User Profile", link: "/user-profile", isShow: true },
        { id: 3, code: "Report", name: "Report", link: "/report", isShow: false },
      ];

    }
  }


  getUserProfile() {   
    this.dataProfile = JSON.parse(sessionStorage.getItem('userProfileIam'));    
  }

  openMenu(i) {
    console.log(i)
  }


  clearCache() {
    sessionStorage.clear();
    this.router.navigateByUrl("/login");
  }

}

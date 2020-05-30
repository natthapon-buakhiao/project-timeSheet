import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestInquiryProfile } from 'src/app/shared/model/req-user-profile';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-app-nev-bar',
  templateUrl: './app-nev-bar.component.html',
  styleUrls: ['./app-nev-bar.component.scss']
})
export class AppNevBarComponent implements OnInit {

  dataProfile: any;
  userCode = '';

  listMenu = [
    { id: 0, code: "Dash Board", name: "Dash Board", link: "/dashboard", isShow: true },
    { id: 1, code: "Attendance List", name: "Attendance List", link: "/attendance", isShow: true },
    { id: 2, code: "User Profile", name: "User Profile", link: "/user-profile", isShow: true },
    // { id: 3, code: "Report", name: "Report", link: "/report", isShow: true },
  ];

  constructor(
    private router: Router,    
  ) { 
     this.dataProfile = JSON.parse(sessionStorage.getItem('userProfileIam'));
     this.userCode = this.dataProfile != null ? this.dataProfile.userCode : '';
  }

  ngOnInit() {    
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

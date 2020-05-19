import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-nev-bar',
  templateUrl: './app-nev-bar.component.html',
  styleUrls: ['./app-nev-bar.component.scss']
})
export class AppNevBarComponent implements OnInit {

  listMenu = [
    { id: 0, code: "Dash Board", name: "Dash Board", link: "/dashboard", isShow: true },
    { id: 1, code: "Attendance List", name: "Attendance List", link: "/attendance", isShow: true },
    { id: 2, code: "User Profile", name: "User Profile", link: "/user-profile", isShow: true },
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  openMenu(i) {
    console.log(i)
  }


  clearCache() {
    sessionStorage.clear();
    this.router.navigateByUrl("/login");
  }

}

import { RequestUserProjectService } from 'src/app/service/request-user-project.service';
import { AddUserProjectDialogComponent } from './add-user-project-dialog/add-user-project-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RequestInquiryProject } from 'src/app/shared/model/request-user-project';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-project',
  templateUrl: './user-project.component.html',
  styleUrls: ['./user-project.component.scss']
})
export class UserProjectComponent implements OnInit {

  displayedColumns: string[] = ['userCode', 'project', 'task', 'date'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataUserProject: any;
  dataProfile: any;
  isSup: boolean = true;

  constructor(
    public dialog: MatDialog,
    private reqUserProject: RequestUserProjectService, 
    private loading: NgxSpinnerService,  
  ) { }

  ngOnInit() {

    this.loading.show();
    setTimeout(() => {      
      this.loading.hide();
    }, 500);

    this.dataProfile = JSON.parse(sessionStorage.getItem('userProfileIam'));    
    if (this.dataProfile.userRoleObjects[0].roleCode == 'SUPERVISOR') {
      this.isSup = true;
    } else {
      this.isSup = false;
    }

    try {
      this.dataUserProject = history.state;
    } catch (e) {

    }
  
    this.inquiryUserProject();

  }


  inquiryUserProject() {
    let request = new RequestInquiryProject();
    this.dataProfile = JSON.parse(sessionStorage.getItem('userProfileIam')); 
    if (this.dataProfile.userRoleObjects[0].roleCode == 'SUPERVISOR') {
      this.isSup = true;
       request.projectCode = this.dataUserProject.data.projectCode;  
    } else {
      this.isSup = false;
      request.projectCode = this.dataUserProject.data.id.project.projectCode;
    }    

    this.reqUserProject.inquiryUserProjectName(request).subscribe((res) => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
      (error) => {
        console.log(error + "get Fail!!")
      });
  }

  openDialogAddUser(dataUserProject) {
    console.log('open dialog Add attendance');
    const dialogRef = this.dialog.open(AddUserProjectDialogComponent, {
      width: '750px',
      position: {
        top: '15%'
      },
      data: { dataAdd: dataUserProject }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.inquiryUserProject();
      }
    });
  }
}

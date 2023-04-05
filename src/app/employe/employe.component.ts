import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export interface PeriodicElement {
  id:number;
  empName: string;
  empDesignation: string;
  empDepartment: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id:0,empName:'Raja', empDesignation:'A-1', empDepartment:'operational' },
  { id:1,empName:'Nandini', empDesignation:'A-2', empDepartment:'marketing' },
  { id:2,empName:'Raja', empDesignation:'B-1', empDepartment:'research' },
  { id:3,empName:'Siri', empDesignation:'C-1', empDepartment:'finance' },
]

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent {

  displayedColumns: string[] = ['id','empName', 'empDesignation', 'empDepartment','action'];
  dataSource = [];

  myForm: any = FormGroup;
  PSService: any;

  usersData: any = [];
  activatedID: any = 0;
  showLoader:any=false;


  constructor(
    private fb: FormBuilder,
    private user1: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.myForm = new FormGroup({
      empName: new FormControl(''),
      empDesignation: new FormControl(''),
      empDepartment: new FormControl(''),
    });
    this.getUsersData();
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
    this.showLoader = true;
    this.user1.postForm(form.value).subscribe((data: any) => {
      this.getUsersData();
    });
  }

  myClickFunction(event:any) {
    console.log(event);
  }
  myUpdateFunction(event:any) {
    this.showLoader = true;
    this.user1.putForm(event.value, this.activatedID).subscribe((data: any) => {
      this.getUsersData();
    });
  }
  getbyid(id:any) {
    this.activatedID = id;
    this.user1.getById(id).subscribe((data:any) => {
      this.myForm.patchValue({
        empName: data['empName'],
        empDesignation: data['empDesignation'],
        empDepartment: data['empDepartment'],
      });
    });
  }

  getbyidview(id:any) {
    this.router.navigate(['/view', id]);
    // this.user.getById(id).subscribe((data) => {});
  }

  delete(id:any) {
    this.user1.delete(id).subscribe((data: any) => {
      this.getUsersData();
    });
  }
  getUsersData() {
    this.showLoader = true;
    
      this.user1.getUsersData().subscribe((data: any) => {
        console.log(data);
        setTimeout(()=>{
          this.showLoader = false;
          this.dataSource = data;
        },1500)
      });
    
  }

}

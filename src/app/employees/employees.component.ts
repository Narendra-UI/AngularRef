import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeesService } from './employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {

  displayedColumns: string[] = ['firstname', 'lastname'];
  dataSource = [];

  myForm: any = FormGroup;
  EmployeesService: any;
  activatedID: any;




  constructor(
    private fb: FormBuilder,
    private employeesService: EmployeesService,
    private router: Router
  ) {}


  ngOnInit() {
    this.myForm = new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
    });
    this.getEmployeesData();
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
    this.employeesService.postForm(form.value).subscribe((data: any) => {
      this.getEmployeesData();
    });
  }
  

  myClickFunction(event:any) {
    console.log(event);
  }
  myUpdateFunction(event:any) {
    this.employeesService.putForm(event.value, this.activatedID).subscribe((data: any) => {
      this.getEmployeesData();
    });
  }
  getbyid(id:any) {
    this.activatedID = id;
    this.employeesService.getById(id).subscribe((data:any) => {
      this.myForm.patchValue({
        firstname: data['firstname'],
        lastname: data['lastname'],
      });
    });
  }

  

  delete(id:any) {
    this.employeesService.delete(id).subscribe((data: any) => {
      this.getEmployeesData();
    });
  }

  getEmployeesData() {    
      this.employeesService.getEmployeesData().subscribe((data: any) => {
        console.log(data);
        setTimeout(()=>{
          this.dataSource = data;
        },1000)
      });
    
  }

  }


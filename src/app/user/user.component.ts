import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PSService } from '../ps.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';

export interface PeriodicElement {
  id:number;
  name: string;
  age: number;
  gender: string;
  email: string;
  role:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id:0,name:'Raja', age:27, gender:'Male', email:'raja@gmail.com', role:'associate'},
  { id:1,name:'Nandini', age:27, gender:'Female', email:'nandini@gmail.com', role:'consultant'},
  { id:2,name:'Rana', age:27, gender:'Male', email:'rana@gmail.com',role:'software Engineer'},
  { id:3,name:'Siri', age:24, gender:'Female', email:'siri@gmail.com',role:'sr consultant'},
]

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  displayedColumns: string[] = ['id','name', 'age', 'gender', 'email','role','action'];
  dataSource = [];

  myForm: any = FormGroup;
  usersData: any = [];
  activatedID: any = 0;
  showLoader: boolean = false;
 roles:any = [];

  constructor(
    private fb: FormBuilder,
    private psService: PSService,
    private user1:UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRoles();
    this.myForm = new FormGroup({
      name: new FormControl(''),
      age: new FormControl(''),
      gender: new FormControl(''),
      email: new FormControl(''),
      role: new FormControl(''),
    });
    this.getUsersData();
  }

  onSubmit(form: FormGroup) {
    console.log(form.value); //{name:'',age:'',}
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
        name: data['name'],
        age: data['age'],
        gender: data['gender'],
        email:data['email'],
        role:data['role'],
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
    this.user1.getUsersData().subscribe((data: any) => {
      this.dataSource = data;
      this.showLoader = false;
    });
  }

 getRoles(){
  this.psService.getRolesData().subscribe((data)=>{
    this.roles = data;
  });
 }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from './role.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export interface PeriodicElement {
  id:number;
  roleName: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { id:0,roleName:'Software Engineer' },
  { id:1,roleName:'Data Analist' },
  { id:2,roleName:'Associate Engineer' },
  { id:3,roleName:'Conssultant' },
]

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {

  displayedColumns: string[] = ['id','roleName','action'];
  dataSource = [];

  myForm: any = FormGroup;
  PSService: any;

  usersData: any = [];
  activatedID: any = 0;
  showLoader:any=false;


  constructor(
    private fb: FormBuilder,
    private user1: RoleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.myForm = new FormGroup({
      roleName: new FormControl(''),
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
        roleName: data['roleName'],
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

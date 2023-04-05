import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TutorialService } from './tutorial.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export interface PeriodicElement {
  id:number;
  title: string;
  description: string;
  published: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id:0,title:'JAVA', description:'A-1', published:'operational' },
  { id:1,title:'JavaScript', description:'A-2', published:'marketing' },
  { id:2,title:'MySQL', description:'B-1', published:'research' },
  { id:3,title:'Angular', description:'C-1', published:'finance' },
]

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent {

  displayedColumns: string[] = ['id','title', 'description', 'published','action'];
  dataSource = [];

  myForm: any = FormGroup;
  PSService: any;

  usersData: any = [];
  activatedID: any = 0;
  showLoader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private user1: TutorialService,
    private router: Router
  ) {}

  ngOnInit() {
    this.myForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      published: new FormControl(''),
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
        title: data['title'],
        description: data['description'],
        published: data['published'],
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
  })

  }
}
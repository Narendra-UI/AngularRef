import { Component } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signup: any = FormGroup;
  isError:boolean=false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private user1:UserService,


    
  ) {}

  ngOnInit(){
    this.signup = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      repassword: new FormControl('')
    });
  }

  onSubmit(form: FormGroup) {
    console.log(form.value.password);

    var x= form.value.password;
    var y= form.value.repassword;

    if (x == y) {
      this.user1.postForm(form.value).subscribe((data: any) => {
        this.router.navigate(['/login'])
      });
    }else{
      this.isError=true;
    }
    

    //check whethere repassword and formcontrol password field are equal or not

    //var s ="sasa"
    //var t = "saas" how to check s is equal to t or not ?

    // if equal then make user service post call (74 line in user component ts) 
    //subscribe(d=>{ then redirect to login page})

    //router import , constructoe include , this.router.navigaet(['/login'])
  }

}

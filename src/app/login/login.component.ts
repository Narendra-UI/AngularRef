import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  login: any = FormGroup;
  isError:boolean=false;


  constructor(
    private fb: FormBuilder,
    private user1:UserService,
    private router: Router,
    
  ) {}


  ngOnInit(){
    this.login = new FormGroup({
      user: new FormControl(''),
      pwd: new FormControl(''),
    });
  }

  onSubmit(form: FormGroup) {
    console.log(form.value); 
    this.user1.login(form.value).subscribe((r:any)=>{
      console.log(r); //{accessToken:"fdfgf"} r.acc
      this.user1.token=r.accessToken;
      if (r.accessToken.length>0){
        this.router.navigate(['/home']);
      }else{
        this.isError = true;
      }
    })  
  }

}

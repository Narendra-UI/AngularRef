import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string="";

  constructor(private http: HttpClient) { }

  getUsersData() {
    return this.http.get('http://localhost:8080/api/users');
  }

  getById(id:any) {
    return this.http.get('http://localhost:8080/api/users/' + id);
  }

  postForm(entity:any) {  //given data in the form{name:'',age:''......}
    return this.http.post('http://localhost:8080/api/users', entity);
  }

  putForm(entity:any, id:any) {
    return this.http.put('http://localhost:8080/api/users/' + id, entity);
  }

  delete(id:any) {
    return this.http.delete('http://localhost:8080/api/users/' + id);
  }

  login(entity:any){       //only name & password will present in entity.
    return this.http.post('http://localhost:3500/auth', entity);
  }
  
}

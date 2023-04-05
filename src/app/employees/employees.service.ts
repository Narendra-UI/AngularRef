import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EmployeesService {

  constructor(private http: HttpClient) { }

  getEmployeesData() {
    return this.http.get('http://localhost:3500/employees');
  }

  getById(id:any) {
    return this.http.get('http://localhost:3500/employees/' + id);
  }

  postForm(entity:any) {
    return this.http.post('http://localhost:3500/employees', entity);
  }

  putForm(entity:any, id:any) {
    return this.http.put('http://localhost:3500/employees/' + id, entity);
  }

  delete(id:any) {
    return this.http.delete('http://localhost:3500/employees/' + id);
  }


}

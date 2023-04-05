import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getUsersData() {
    return this.http.get('http://localhost:8080/api/role');
  }

  getById(id:any) {
    return this.http.get('http://localhost:8080/api/role/' + id);
  }

  postForm(entity:any) {
    return this.http.post('http://localhost:8080/api/role', entity);
  }

  putForm(entity:any, id:any) {
    return this.http.put('http://localhost:8080/api/role/' + id, entity);
  }

  delete(id:any) {
    return this.http.delete('http://localhost:8080/api/role/' + id);
  }

}

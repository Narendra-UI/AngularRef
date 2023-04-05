import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  getUsersData() {
    return this.http.get('http://localhost:8080/api/tutorials');
  }

  getById(id:any) {
    return this.http.get('http://localhost:8080/api/tutorials/' + id);
  }

  postForm(entity:any) {
    return this.http.post('http://localhost:8080/api/tutorials', entity);
  }

  putForm(entity:any, id:any) {
    return this.http.put('http://localhost:8080/api/tutorials/' + id, entity);
  }

  delete(id:any) {
    return this.http.delete('http://localhost:8080/api/tutorials/' + id);
  }
  
}

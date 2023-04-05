import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PSService {

  constructor(private http: HttpClient) {}

  getRolesData() {
    return this.http.get('http://localhost:8080/api/role');
  }
}

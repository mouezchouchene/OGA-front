import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ENotificationsService {

  token: string;
  id;
  constructor( private http : HttpClient ) {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('id');
  }

  getNotifs() : Observable<any>{
    return this.http.get('http://localhost:8085/api/notifications/user/'+this.id, {headers: new HttpHeaders({Authorization: 'Bearer '+this.token})});
  }
  
  resetNotifs() : Observable<any>{
    return this.http.put('http://localhost:8080/api/compteurNotifAzero/'+this.id, {headers: new HttpHeaders({Authorization: 'Bearer '+this.token})});
  }

}

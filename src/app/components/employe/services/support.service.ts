import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  token: string;
  id: string;
  constructor(private http : HttpClient) {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('id');
  }

  ajouteTicket(ticket) : Observable<any>{ 
    return this.http.post('http://localhost:8086/api/user/'+this.id+'/ticket2', ticket, {headers: new HttpHeaders({Authorization: 'Bearer '+this.token})} );
  }

  ajouteTicketAvecAttachment(ticket) : Observable<any>{ 
    return this.http.post('http://localhost:8086/api/user/'+this.id+'/ticket', ticket, {headers: new HttpHeaders({Authorization: 'Bearer '+this.token})} );
  }

  getTicketById(ticket_id) : Observable<any>{ 
    return this.http.get('http://localhost:8086/api/ticket'+ticket_id, {headers: new HttpHeaders({Authorization: 'Bearer '+this.token})} );
  }

  putTicketById(ticket_id, ticket) : Observable<any>{ 
    return this.http.put('http://localhost:8086/api/ticket'+ticket_id, ticket, {headers: new HttpHeaders({Authorization: 'Bearer '+this.token})} );
  }

  getAllTicketsByUser() : Observable<any>{ 
    return this.http.get('http://localhost:8086/api/tickets/'+this.id, {headers: new HttpHeaders({Authorization: 'Bearer '+this.token})} );
  }
  
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FournisseurServiceService {

  token: string;
  id: string;
  constructor(private http : HttpClient) {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('id');
  }

  ajouterFournisseur(fournisseur) : Observable<any>{ 
    return this.http.post('http://localhost:8084/fournisseur', fournisseur, {headers: new HttpHeaders({Authorization: 'Bearer '+this.token})} );
  }

  getFournisseurs() : Observable<any> {
    return this.http.get('http://localhost:8084/fournisseur', {headers: new HttpHeaders({Authorization: 'Bearer '+this.token})} );
  }

  deleteFournisseur(idFournisseur) : Observable<any>{ 
    return this.http.delete('http://localhost:8084/api/fournisseur/'+idFournisseur, {headers: new HttpHeaders({Authorization: 'Bearer '+this.token})} );
  }

}

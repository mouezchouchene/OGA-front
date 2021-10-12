import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MesProjetsService {

  token: string;
  id;

  constructor(private http : HttpClient) {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('id');
  }

  getAllMyProject() : Observable<any>{
    return this.http.get('http://localhost:8083/api/user/'+this.id+'/projects', {headers: new HttpHeaders({Authorization: 'Bearer '+this.token})});
  }

  getMyTachesPerProject(projectId) : Observable<any>{
    return this.http.get('http://localhost:8083/api/project/'+projectId+'/user/'+this.id+'/taches', {headers: new HttpHeaders({Authorization: 'Bearer '+this.token})});
  }
  
  updateProgress(avancement, tacheId) : Observable<any> {
    return this.http.put(`http://localhost:8083/api/avancementTache/${tacheId}?avancement=`+avancement, {headers: new HttpHeaders({Authorization: 'Bearer '+this.token})});
  }

  declarerProblem(problem, tacheId) : Observable<any> {
    return this.http.put(`http://localhost:8083/api/blockageTache/${tacheId}`, problem, {headers: new HttpHeaders({Authorization: 'Bearer '+this.token})});
  }

}


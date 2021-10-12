import { Component, OnInit } from '@angular/core';
import { MesProjetsService } from '../services/mes-projets.service';

@Component({
  selector: 'app-mes-projets',
  templateUrl: './mes-projets.component.html',
  styleUrls: ['./mes-projets.component.scss']
})
export class MesProjetsComponent implements OnInit {

  mesProjets: [any];

  constructor(
    private mesProjetsService: MesProjetsService
  ) {}

  role;
  ngOnInit(): void {
    this.role = localStorage.getItem('role')
    this.mesProjetsService.getAllMyProject().subscribe(
      response => {this.mesProjets = response.reverse(); console.log(response)},
      error => console.log(error)
    );
  }

  getLink(id){
    if(this.role === "Chef de projet") 
    return ['/employe/chefprojet', id];
    return  ['/employe/projet', id];
  }

}
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ENotificationsService } from '../services/e-notifications.service';

@Component({
  selector: 'app-e-navbar',
  templateUrl: './e-navbar.component.html',
  styleUrls: ['./e-navbar.component.scss']
})
export class ENavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private notificationsService: ENotificationsService
  ) {}

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('departement');
    localStorage.removeItem('nom');
    localStorage.removeItem('id');
    this.router.navigate(['/']);
  }

  nom: string;
  departement: string;

  configureRoute(type){
    switch(type){
      case "Demande": return ['/employe/historique-demandes'];
      case "AppelDoffre": return ['/employe/historique-appels-offres'];
      case "Etude": return ['/employe/historique-etudes'];
      case "Project": return ['/employe/mes-projets'];

      default: return ['/employe'];
    }
  }

  configureImage(notif){
    if(notif.type == "Demande"){
      if(notif.accepted) return "../../../assets/accepted.png";
      return "../../../assets/refused.png";
    }

    if(notif.type == "AppelDoffre" || notif.type == "Etude"){
      if(notif.accepted) return "../../../assets/accepted.png";
      return "../../../assets/refused.png";
    }

    if(notif.type == "Project"){
      return "../../../assets/project.jpg";
    }

    return "../../../assets/default_profile.png";
  }

  notifs;
  newNotifs: number;

  ngOnInit(){
    this.nom = localStorage.getItem('nom');
    this.departement = localStorage.getItem('departement');
    this.notificationsService.getNotifs().subscribe(
      response => {
        console.log(response)
        this.notifs = response.notifs;
        this.newNotifs = response.notifCompteur;
        console.log(response)
      },
      error => console.log(error)
    );
  }

  resetNotifs(){
    this.notificationsService.resetNotifs().subscribe(
      res => this.newNotifs = 0,
      err => console.log(err)
    );
  }

}

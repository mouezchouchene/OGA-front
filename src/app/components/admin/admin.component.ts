import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ENotificationsService } from '../employe/services/e-notifications.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

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

  configureRoute(type){
    switch(type){
      case "Demande": return ['/admin/demandes'];
      case "AppelDoffre": return ['/admin/historique-appels-offres']
      case "Stock": return ['/admin/categories'];
      case "Etude": return ['/admin/historique-etudes'];
      case "Project": return ['/admin/projets'];

      default: return ['/admin/dashboard'];
    }
  }

  configureImage(notif){
    if(notif.imageUrl) return notif.imageUrl;
    return "../../../assets/default_profile.png";
  }

  notifs;
  newNotifs: number;

  nom: string;
  ngOnInit(){
    this.nom = localStorage.getItem('nom');
    this.notificationsService.getNotifs().subscribe(
      response => {
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

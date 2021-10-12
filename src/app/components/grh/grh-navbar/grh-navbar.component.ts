import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ENotificationsService } from '../../employe/services/e-notifications.service';

@Component({
  selector: 'app-grh-navbar',
  templateUrl: './grh-navbar.component.html',
  styleUrls: ['./grh-navbar.component.scss']
})
export class GrhNavbarComponent {

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

  notifs;
  newNotifs;

  configureRoute(type){
    switch(type){
      case "Demande": return ['/admin/demandes'];
      default: return ['/admin/dashboard'];
    }
  }

  configureImage(notif){
    if(notif.imageUrl) return notif.imageUrl;
    return "../../../assets/default_profile.png";
  }

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

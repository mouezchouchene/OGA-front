import { Component, OnInit } from '@angular/core';
import { SupportService } from '../../services/support.service';

@Component({
  selector: 'app-support-historique',
  templateUrl: './support-historique.component.html',
  styleUrls: ['./support-historique.component.scss']
})
export class SupportHistoriqueComponent implements OnInit {

  myTickets = []

  constructor(
    private supportService: SupportService
  ) { }

  ngOnInit(): void {
    this.supportService.getAllTicketsByUser().subscribe(
      response => this.myTickets = response,
      err => console.log(err)
    );
  }

}

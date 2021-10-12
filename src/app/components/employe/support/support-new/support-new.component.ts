import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SupportService } from '../../services/support.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-support-new',
  templateUrl: './support-new.component.html',
  styleUrls: ['./support-new.component.scss'],
  providers: [DatePipe]
})
export class SupportNewComponent implements OnInit {

  titre: string;
  description: string;

  // File upload
  emptyFile : File;
  fileUrl = null;
  selectedFile : File;
  onFileSelected(event){
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.fileUrl = reader.result; 
    }
    this.selectedFile = event.target.files[0];
  }

  constructor(
    private _snackBar: MatSnackBar,
    private supportService : SupportService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.titre = '';
    this.description = '';
  }

  envoyer(){
    // control
    if(!this.titre.trim() || !this.description.trim()){
      this._snackBar.open("Vous devez remplir tous les champs", '', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration : 2500,
        panelClass : 'errToast'
      });
      return;
    }

    let dateTime = new Date();
    let date = this.datePipe.transform(dateTime, 'dd-MM-yyyy');

    console.log(this.selectedFile)

    if(this.selectedFile){
      var ticket = new FormData();
      ticket.set("date", date);
      ticket.set("titre", this.titre);
      ticket.set("status", 'false');
      ticket.set("description_employe", this.description);
      ticket.set("file", this.selectedFile);

      this.supportService.ajouteTicketAvecAttachment(ticket).subscribe(
        response => {
          this._snackBar.open("Ticket crée avec success", '', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration : 3000,
            panelClass : 'successToast'
          });
          this.ngOnInit();
        },
        error => {
          this._snackBar.open("Une erreur s'est produit", '', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration : 2500,
            panelClass : 'errToast'
          });
          console.log(error);
        }
      );

    } else {
      const ticket = {
        date: date,
        titre: this.titre,
        status: false,
        description_employe: this.description,
        reponse: ''
      }

      this.supportService.ajouteTicket(ticket).subscribe(
        response => {
          this._snackBar.open("Ticket crée avec success", '', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration : 3000,
            panelClass : 'successToast'
          });
          this.ngOnInit();
        },
        error => {
          this._snackBar.open("Une erreur s'est produit", '', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration : 2500,
            panelClass : 'errToast'
          });
          console.log(error);
        }
      );
    }
    
  }

}

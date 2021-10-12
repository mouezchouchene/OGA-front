import { Component, Inject, OnInit } from '@angular/core';
import { MesProjetsService } from '../services/mes-projets.service';
import { ActivatedRoute } from '@angular/router'; 
import { AdminProjetsService } from '../../admin/services/admin-projets.service';
import { GrhEmployesService } from '../../grh/services/grh-employes.service';
import jspdf from 'jspdf';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-e-mes-taches',
  templateUrl: './e-mes-taches.component.html',
  styleUrls: ['./e-mes-taches.component.scss'],
})
export class EMesTachesComponent implements OnInit {

  taches :[any]
  idProject;

  constructor(
    private mesProjetsService: MesProjetsService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private adminProjects: AdminProjetsService,
    private grhEmployeService: GrhEmployesService,
    ) {}

  ngOnInit(): void {
    this.route.params.subscribe( params => this.idProject = params.idProjet);
    this.mesProjetsService.getMyTachesPerProject(this.idProject).subscribe(
      response => {this.taches = response.reverse(); console.log( this.taches)},
      error => console.log(error)
    );
  }

  onInputChange(event, tacheId) {
    console.log(tacheId+' : '+event.value);
    this.mesProjetsService.updateProgress(event.value, tacheId).subscribe(
      response => {},
      error => console.log(error)
    );
  }

  //FIXME:
  // getUserImage(userId){
  //   this.grhEmployeService.InfoEmploye(userId).subscribe(
  //     response => {
  //       if(response.profileImage != null) return response.profileImage
  //       return '../../../../assets/default_profile.png'
  //     },
  //     error => console.log(error)
  //   );
  // }

  downloadPdf(tache) {
    const doc = new jspdf();
    doc.text(`**Titre**: ${tache.titre}`, 10, 10);
    doc.text(`**Description**: ${tache.description}`, 10, 17);
    doc.save(`tache-${tache.titre}.pdf`);
  }

  displayReportProblem = true;
  problem = "";
  showReportProblem(){
    this.displayReportProblem = true;
  }
  reportProblem(){
    alert(this.problem)
  }

  openDialog(tache) {
    if(tache.problem) return;
    this.dialog.open(DialogProblem, {
      data: tache.id
    });
  }

}





// Dialog 
@Component({
  selector: 'e-tache-problem',
  templateUrl: 'e-tache-problem.html',
  styleUrls: ['./e-mes-taches.component.scss']
})
export class DialogProblem {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private mesProjetService: MesProjetsService,
  ) {}


  ngOnInit(){}

  reportProblem(){
    this.mesProjetService.declarerProblem(this.problem, this.data).subscribe(
      res => {
        this._snackBar.open("Blockage déclaré !" , '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration : 3000,
          panelClass : 'successToast'
        });
      },
      err => this._snackBar.open("une err s'est produit", '', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration : 2500,
        panelClass : 'errToast'
      })
    );
  }
  problem;
}
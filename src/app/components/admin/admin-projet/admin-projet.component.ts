import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminProjetsService } from '../services/admin-projets.service';
import jspdf from 'jspdf';
import { MesProjetsService } from '../../employe/services/mes-projets.service';

@Component({
  selector: 'app-admin-projet',
  templateUrl: './admin-projet.component.html',
  styleUrls: ['./admin-projet.component.scss'],
  providers: [DatePipe]
})
export class AdminProjetComponent implements OnInit {

  // For the accordion 
  step = 1;
  setStep(index: number) {
    this.step = index;
  }

  constructor(
    private route: ActivatedRoute,
    private adminProjectService: AdminProjetsService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private mesProjetsService: MesProjetsService
  ) { }

  idProject;
  
  title: string;
  description: string;
  dateDebut: string;
  empsDansLeProjet;
  taches;
  dificulte;

  projetExist: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe( params => this.idProject = params.id);

    this.adminProjectService.getProjet(this.idProject).subscribe(
      response => {
        this.title = response.title;
        this.description = response.description;
        this.dateDebut = response.dateDebut;
        this.empsDansLeProjet = response.userDto;
        this.taches = response.tahces;
        this.projetExist = true;
      },
      error => {
        console.log(error)
        this.projetExist = false;
      }
    );

    this.adminProjectService.gettNonAffectedProjects(this.idProject).subscribe(
      res => this.employesNonAffectes = res , 
      err => console.log(err)
    );
  }

  maj(){
    this.dateDebut = formatDate(this.dateDebut,'yyyy-MM-dd', 'en_US');
    if(!this.title.trim() || !this.description.trim() || !this.dateDebut.trim() ){
      this._snackBar.open("Vous devez remplir tous les champs", '', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration : 2500,
        panelClass : 'errToast'
      });
      return;
    }

    let projet = {
      title: this.title,
      description: this.description,
      dateDebut: this.dateDebut,
    }

    this.adminProjectService.putProjet(this.idProject, projet)
    .subscribe(response => {
      this._snackBar.open("Un projet avec l'id: "+response.id+"  a été mis à jour" , '', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration : 3000,
        panelClass : 'successToast'
      });
      this.ngOnInit();
    }, error => {
      this._snackBar.open("Une erreur s'es produit, essayer plus tard", '', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration : 3000,
        panelClass : 'errToast'
      });
      console.log(error);
    })
  }

  supprimer(){
    this.adminProjectService.deleteProject(this.idProject)
    .subscribe(response => {
      this._snackBar.open("Un projet a été supprimer" , '', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration : 3000,
        panelClass : 'successToast'
      });
      this.ngOnInit();
    }, error => {
      this._snackBar.open("Une erreur s'es produit, essayer plus tard", '', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration : 3000,
        panelClass : 'errToast'
      });
      console.log(error);
    })
  }

  // ajouter employes
  employesNonAffectes = [];
  form: FormGroup = new FormGroup({});
  options: FormGroup;
  employerAAjouter = new FormControl('');

  ajouterEMplyeAuProjet(){
    if(!this.employerAAjouter.value){
      this._snackBar.open("Entrer un employé", '', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration : 2500,
        panelClass : 'errToast'
      });
      return;
    }
    let employes = [];
    employes.push(this.employerAAjouter.value.id);
    console.log(employes)
    this.adminProjectService.ajouterEmploye(this.idProject, employes).subscribe(
      res => {
        this._snackBar.open("Employé ajouté !" , '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration : 3000,
          panelClass : 'successToast'
        });
        this.ngOnInit();
      },
      err => this._snackBar.open("une err s'st produit", '', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration : 2500,
        panelClass : 'errToast'
      })
    );
  }

  deleteUserFromProject(idUser){
    this.adminProjectService.deleteUserFromProject(this.idProject, idUser).subscribe(
      res => {
        console.log(res);
        this._snackBar.open("Employé supprimé du projet !" , '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration : 3000,
          panelClass : 'successToast'
        });
        this.ngOnInit();
      },
      err => {
        if(err.status === 200 ) {
          this._snackBar.open("Succes !" , '', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration : 3000,
            panelClass : 'successToast'
          });
          this.ngOnInit();
        } else {
        this._snackBar.open("une err s'est produit", '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration : 2500,
          panelClass : 'errToast'
        });
        console.log(err);
      }}
    );
  }

  // taches

  dateDebutTache; dateFinTache;
  titreTache; descTache;
  ajouterTache(){
    let tache = {
      titre : this.titreTache,
      description : this.descTache,
      dateDebut : this.datePipe.transform(this.dateDebutTache, 'dd-MM-yyyy'),
      dateFin : this.datePipe.transform(this.dateFinTache, 'dd-MM-yyyy'),
      dificulte : 'normal',
      status: 'attente'
    }
    this.adminProjectService.ajouterTache(this.idProject, tache).subscribe(
      res => {
        this._snackBar.open("Tache ajoutée avec success !" , '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration : 3000,
          panelClass : 'successToast'
        });
        this.ngOnInit();
      },
      err => {
        this._snackBar.open("une err s'est produit", '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration : 2500,
          panelClass : 'errToast'
        });
        console.log(err);
      }
    );
  }

  onInputChange(event, tacheId) {
    console.log(tacheId+' : '+event.value);
    this.mesProjetsService.updateProgress(event.value, tacheId).subscribe(
      response => {},
      error => console.log(error)
    );
  }

  deleteTache(tacheId) {
    this.adminProjectService.deleteTache(tacheId).subscribe(
      response => this.ngOnInit(),
      error => console.log(error)
    );
  }

  downloadPdf(tache) {
    const doc = new jspdf();
    doc.text(`**Titre**: ${tache.titre}`, 10, 10);
    doc.text(`**Description**: ${tache.description}`, 10, 17);
    doc.save(`tache-${tache.titre}.pdf`);
  }

  openDialog(tache) {
    this.dialog.open(DialogDataExampleDialog2, {
      data: tache
    });
  }

}










// Dialog 
@Component({
  selector: 'admin-consulter-tache',
  templateUrl: 'consulter-tache.html',
  styleUrls: ['./admin-projet.component.scss']
})
export class DialogDataExampleDialog2 {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private adminProjectService: AdminProjetsService,
  ) {}

  tache : any = {
    titre : ""
  };

  ngOnInit(){
    this.adminProjectService.getTacheById(this.data.id).subscribe(
      res => {this.tache = res;},
      err => console.log(err)
    );
    this.adminProjectService.getuserNonAffecteAutache(this.data.id).subscribe(
      res => this.employesNonAffectes=res,
      err => console.log(err)
    );
  }

  // ajouter employes
  employesNonAffectes;
  form: FormGroup = new FormGroup({});
  options: FormGroup;
  employerAAjouter = new FormControl('');

  ajouterEmplyeAuTache(){
    if(!this.employerAAjouter.value){
      this._snackBar.open("Entrer un employé", '', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration : 2500,
        panelClass : 'errToast'
      });
      return;
    }
    let employes = [];
    employes.push(this.employerAAjouter.value.id);
    console.log(employes)
    this.adminProjectService.ajouterEmployesAuTache(this.data.id, employes).subscribe(
      res => {
        this._snackBar.open("Employé ajouté !" , '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration : 3000,
          panelClass : 'successToast'
        });
        this.ngOnInit();
      },
      err => this._snackBar.open("une err s'st produit", '', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration : 2500,
        panelClass : 'errToast'
      })
    );
  }

  deleteUserFromTache(idUser){
    this.adminProjectService.deleteUserFromTache(this.tache.id, idUser).subscribe(
      res => {
        this._snackBar.open("Succes !" , '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration : 3000,
          panelClass : 'successToast'
        });
        this.ngOnInit();
      } ,
      err => {
        if(err.status === 200 ) {
          this._snackBar.open("Succes !" , '', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration : 3000,
            panelClass : 'successToast'
          });
          this.ngOnInit();
        } else {
          this._snackBar.open("une err s'est produit", '', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration : 2500,
            panelClass : 'errToast'
          });
          console.log(err);
        }
      }
    );
  }

}
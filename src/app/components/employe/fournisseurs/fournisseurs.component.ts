import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FournisseurServiceService } from '../services/fournisseur-service.service';

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.scss']
})
export class FournisseursComponent implements OnInit {

  // For the accordion 
  step = 1;
  setStep(index: number) {
    this.step = index;
  }
  
  nom: string;
  email: string;
  addresse: string;
  tel: number;

  fournisseurs = [];

  constructor(
    private _snackBar: MatSnackBar,
    private fournisseurService: FournisseurServiceService
  ) { }

  ngOnInit(): void {
    this.nom = '';
    this.email = '';
    this.addresse = '';
    this.tel = undefined;
    this.fournisseurService.getFournisseurs().subscribe(
      response => this.fournisseurs = response.reverse(),
      error => console.log(error)
    );
  }

  ajouterFournisseur(){
    if(!this.nom.trim() || !this.email.trim() ){
      this._snackBar.open("Vous devez remplir le nom et l'email du fournisseur", '', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration : 2500,
        panelClass : 'errToast'
      });
      return;
    }
    let newFournisseur = {
      nom: this.nom,
      email: this.email,
      address: this.addresse,
      telephone: this.tel
    }
    this.fournisseurService.ajouterFournisseur(newFournisseur)
    .subscribe(response => {
      this._snackBar.open("Fournisseur ajouté avec succés", '', {
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
    });
  }

  deleteFournisseur(id){
    this.fournisseurService.deleteFournisseur(id)
    .subscribe(response => {
      this._snackBar.open("Fournisseur supprimé avec succés" , '', {
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
    });
  }
}

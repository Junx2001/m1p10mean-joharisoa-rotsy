import { Injectable } from '@angular/core';
import { Voiture } from '../models/voiture.model';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {
    voitures : Voiture[] = [
        {
            clientId: 2,
            id: 1,
            immatriculation: "TAB1254",
            marque: "Hyundai",
            modele: "Starex"
        },
        {
            clientId: 2,
            id: 2,
            immatriculation: "TBG1325",​​
            marque: "Hyundai",​​
            modele: "Santa Fe"
        }
    ];
    constructor ( ){}
    
    getVoituresDepot(): Voiture[] {
        return this.voitures;
    }
    addVoiture(formValue:{id : number,immatriculation: string, clientId: number,marque:string, modele:string }): Voiture{
        this.voitures.push(formValue);
        return formValue;
    }
}